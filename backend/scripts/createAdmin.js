const mongoose = require("mongoose");
const User = require("../model/user");
const path = require("path");

// Load environment config
require("dotenv").config({
  path: path.join(__dirname, "../config/.env"),
});

async function createAdmin() {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      console.error("DB_URL is not defined in config/.env");
      process.exit(1);
    }

    console.log("Connecting to database...");
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");

    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log(`Admin user already exists with email: ${existingAdmin.email}`);
      process.exit(0);
    }

    const adminEmail = process.env.ADMIN_MAIL || process.env.ADMIN_EMAIL || "admin@vendoz.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminAvatar = process.env.ADMIN_AVATAR || "default-avatar.png";

    await User.create({
      name: "Yash",
      email: adminEmail,
      password: adminPassword,
      avatar: adminAvatar,
      role: "admin",
    });

    console.log(`Admin Yash (${adminEmail}) created successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating Admin:", error);
    process.exit(1);
  }
}

createAdmin();