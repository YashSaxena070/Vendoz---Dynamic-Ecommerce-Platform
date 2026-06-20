const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

// Check if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (req.user.email === "yashsaxena7668@gmail.com" && req.user.role !== "Admin") {
    req.user.role = "Admin";
    await req.user.save();
  }

  if (req.user.isBlocked) {
    // Immediately clear the cookie so they are logged out server-side
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return next(
      new ErrorHandler(
        "ACCOUNT_BLOCKED:Your account has been blocked by the administrator. Please contact yashsaxena7668@gmail.com for assistance.",
        403
      )
    );
  }

  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  if (!req.seller) {
    return next(new ErrorHandler("Seller not found", 404));
  }

  if (req.seller.isBlocked) {
    // Immediately clear the cookie so they are logged out server-side
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return next(
      new ErrorHandler(
        "ACCOUNT_BLOCKED:Your shop account has been blocked by the administrator. Please contact yashsaxena7668@gmail.com for assistance.",
        403
      )
    );
  }

  next();
});

exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role ? req.user.role.toLowerCase() : "";
    const lowerRoles = roles.map((r) => r.toLowerCase());
    if (!lowerRoles.includes(userRole)) {
      return next(
        new ErrorHandler(`${req.user.role} cannot access this resource!`, 403)
      );
    }
    next();
  };
};
