const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const User = require("../model/user");
const Shop = require("../model/shop");
const Order = require("../model/order");

// GET /api/v2/admin/stats  — comprehensive platform analytics
router.get(
  "/stats",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const [totalUsers, totalSellers, blockedUsers, blockedSellers, allOrders] =
        await Promise.all([
          User.countDocuments({ role: { $in: ["user", "User"] } }),
          Shop.countDocuments({}),
          User.countDocuments({ isBlocked: true }),
          Shop.countDocuments({ isBlocked: true }),
          Order.find().sort({ createdAt: -1 }),
        ]);

      // Total revenue and commission
      const totalRevenue = allOrders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
      const totalCommission = totalRevenue * 0.1;

      // Orders by status
      const ordersByStatus = allOrders.reduce((acc, o) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      }, {});

      // Monthly growth — last 12 months
      const now = new Date();
      const monthlyData = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        const monthKey = date.toLocaleString("en-US", { month: "short", year: "2-digit" });

        const [mUsers, mSellers, mOrders] = await Promise.all([
          User.countDocuments({
            createdAt: { $gte: date, $lt: endDate },
            role: { $in: ["user", "User"] },
          }),
          Shop.countDocuments({ createdAt: { $gte: date, $lt: endDate } }),
          Order.find({ createdAt: { $gte: date, $lt: endDate } }),
        ]);

        const mRevenue = mOrders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

        monthlyData.push({
          month: monthKey,
          users: mUsers,
          sellers: mSellers,
          orders: mOrders.length,
          revenue: mRevenue,
          commission: mRevenue * 0.1,
        });
      }

      // Top 5 sellers by revenue (from orders)
      const sellerRevMap = {};
      allOrders.forEach((order) => {
        const sid = order.cart?.[0]?.shopId;
        if (sid) {
          sellerRevMap[sid] = (sellerRevMap[sid] || 0) + (order.totalPrice || 0);
        }
      });
      const topSellerIds = Object.entries(sellerRevMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, rev]) => ({ id, revenue: rev }));

      const topSellers = await Promise.all(
        topSellerIds.map(async ({ id, revenue }) => {
          const shop = await Shop.findById(id).select("name email avatar");
          return { shop, revenue };
        })
      );

      res.status(200).json({
        success: true,
        stats: {
          totalUsers,
          totalSellers,
          blockedUsers,
          blockedSellers,
          totalOrders: allOrders.length,
          totalRevenue,
          totalCommission,
          ordersByStatus,
          monthlyData,
          topSellers,
        },
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
