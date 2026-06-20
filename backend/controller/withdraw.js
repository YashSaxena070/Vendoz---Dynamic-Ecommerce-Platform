const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;
      const parsedAmount = Number(amount);

      const shop = await Shop.findById(req.seller._id);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return next(new ErrorHandler("Withdraw amount must be greater than 0", 400));
      }

      if (parsedAmount > shop.availableBalance) {
        return next(new ErrorHandler("You do not have enough balance to withdraw this amount!", 400));
      }

      const data = {
        seller: req.seller,
        amount: parsedAmount,
      };

      const withdraw = await Withdraw.create(data);

      shop.availableBalance = shop.availableBalance - parsedAmount;
      await shop.save();

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${parsedAmount}$ is processing. It will take 3days to 7days to processing! `,
        });
      } catch (error) {
        console.error("Mail sending failed for withdraw request:", error);
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraws --- admnin

router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request ---- admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId, status } = req.body;

      const withdraw = await Withdraw.findById(req.params.id);

      if (!withdraw) {
        return next(new ErrorHandler("Withdraw request not found", 404));
      }

      const seller = await Shop.findById(sellerId);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      if (status === "Rejected") {
        // Refund the amount back to the seller
        seller.availableBalance = seller.availableBalance + withdraw.amount;
        
        withdraw.status = "Rejected";
        withdraw.updatedAt = Date.now();
        await withdraw.save();

        const transection = {
          _id: withdraw._id,
          amount: withdraw.amount,
          updatedAt: withdraw.updatedAt,
          status: "Rejected",
        };
        seller.transections = [...seller.transections, transection];
        await seller.save();

        try {
          await sendMail({
            email: seller.email,
            subject: "Withdraw Request Rejected",
            message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ has been rejected. The amount has been credited back to your shop balance.`,
          });
        } catch (error) {
          console.error("Mail sending failed for withdraw rejection:", error);
        }
      } else {
        // Default/Succeed
        withdraw.status = "succeed";
        withdraw.updatedAt = Date.now();
        await withdraw.save();

        const transection = {
          _id: withdraw._id,
          amount: withdraw.amount,
          updatedAt: withdraw.updatedAt,
          status: withdraw.status,
        };
        seller.transections = [...seller.transections, transection];
        await seller.save();

        try {
          await sendMail({
            email: seller.email,
            subject: "Payment confirmation",
            message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
