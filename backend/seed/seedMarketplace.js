const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../config/.env"),
});

console.log("DB URL from env:", process.env.DB_URL);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Shop = require("../model/shop");
const Product = require("../model/product");
const Event = require("../model/event");

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });

// Helper function to fetch images dynamically from Unsplash
async function getImage(query) {
    const fallbackImages = {
        "Computers and Laptops": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "Mobile and Tablets": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "Music and Gaming": "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/analog-classic.jpg",
        "Accesories": "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/accessories-bag.jpg",
        "Shoes": "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.jpg",
        "Cloths": "https://res.cloudinary.com/demo/image/upload/v1/samples/people/boy-snow-hoodie.jpg",
        "Others": "https://res.cloudinary.com/demo/image/upload/v1/samples/chair.jpg"
    };

    const cleanQuery = (query || "").trim();
    const key = (process.env.UNSPLASH_KEY || "").trim();

    if (!key) {
        console.log(`No UNSPLASH_KEY found, using fallback for "${cleanQuery}"`);
        return fallbackImages[query] || "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    }

    try {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cleanQuery)}&per_page=1`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Client-ID ${key}`,
            },
        });

        if (!response.ok) {
            console.log(`Unsplash API returned status ${response.status} for query "${cleanQuery}", using fallback.`);
            return fallbackImages[query] || "https://res.cloudinary.com/demo/image/upload/sample.jpg";
        }

        const data = await response.json();
        const imageUrl = data.results[0]?.urls?.regular;

        if (imageUrl) {
            return imageUrl;
        }

        console.log(`No image results found for query "${cleanQuery}", using fallback.`);
        return fallbackImages[query] || "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    } catch (error) {
        console.log(`Error fetching image for query "${cleanQuery}": ${error.message}, using fallback.`);
        return fallbackImages[query] || "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    }
}

const seedData = async () => {
    try {
        console.log("Cleaning up old marketplace data...");
        await Shop.deleteMany();
        await Product.deleteMany();
        await Event.deleteMany();

        console.log("Creating new shops...");
        const hashedPassword = bcrypt.hashSync("123456", 10);

        const shops = [
            {
                name: "TechZone",
                email: "techzone@vendoz.com",
                password: hashedPassword,
                description: "Your ultimate destination for smartphones, laptops, headphones, and accessories.",
                address: "Noida, Uttar Pradesh",
                phoneNumber: 9999999991,
                avatar: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&h=150&fit=crop",
                zipCode: 201301,
                isBlocked: false
            },
            {
                name: "FashionHub",
                email: "fashionhub@vendoz.com",
                password: hashedPassword,
                description: "Trendsetting apparel, activewear, watches, and streetwear.",
                address: "Delhi, Connaught Place",
                phoneNumber: 9999999992,
                avatar: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&h=150&fit=crop",
                zipCode: 110001,
                isBlocked: false
            },
            {
                name: "BookNest",
                email: "booknest@vendoz.com",
                password: hashedPassword,
                description: "A cozy corner for productivity guides, classic literature, and development books.",
                address: "Gurgaon, Sector 45",
                phoneNumber: 9999999993,
                avatar: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=150&h=150&fit=crop",
                zipCode: 122001,
                isBlocked: false
            },
            {
                name: "HomeComfort",
                email: "homecomfort@vendoz.com",
                password: hashedPassword,
                description: "Premium ergonomic furniture, lamps, clocks, and indoor planter pots.",
                address: "Andheri West, Mumbai",
                phoneNumber: 9999999994,
                avatar: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&h=150&fit=crop",
                zipCode: 400001,
                isBlocked: false
            },
            {
                name: "SportsElite",
                email: "sportselite@vendoz.com",
                password: hashedPassword,
                description: "Professional equipment, fitness accessories, mats, and gym gear.",
                address: "Whitefield, Bangalore",
                phoneNumber: 9999999995,
                avatar: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&h=150&fit=crop",
                zipCode: 560001,
                isBlocked: false
            }
        ];

        const createdShops = await Shop.insertMany(shops);
        console.log("Shops created successfully.");

        const techShop = createdShops[0];
        const fashionShop = createdShops[1];
        const bookShop = createdShops[2];
        const homeShop = createdShops[3];
        const sportsShop = createdShops[4];

        const productTemplates = [
            // --- Computers and Laptops (TechZone) ---
            {
                name: "MacBook Pro",
                description: "Apple MacBook Pro with M3 chip, 8GB Unified Memory, 512GB SSD Storage, Space Gray.",
                category: "Computers and Laptops",
                originalPrice: 169999,
                discountPrice: 149999,
                stock: 10,
                query: "macbook pro",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Dell XPS",
                description: "Dell XPS 13 Laptop, Intel Core i7, 16GB RAM, 512GB SSD, 13.4 inch FHD+ Display.",
                category: "Computers and Laptops",
                originalPrice: 129999,
                discountPrice: 114999,
                stock: 15,
                query: "dell xps laptop",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Monitor",
                description: "LG Ultragear 27-inch IPS Gaming Monitor, 144Hz, 1ms response time, G-Sync Compatible.",
                category: "Computers and Laptops",
                originalPrice: 19999,
                discountPrice: 15999,
                stock: 12,
                query: "gaming monitor display",
                shopId: techShop._id,
                shop: techShop
            },

            // --- Mobile and Tablets (TechZone) ---
            {
                name: "iPhone 15",
                description: "Apple iPhone 15, 128GB, Black - Super Retina XDR display, advanced dual-camera system.",
                category: "Mobile and Tablets",
                originalPrice: 79999,
                discountPrice: 72999,
                stock: 25,
                query: "iphone 15 phone",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Samsung S24",
                description: "Samsung Galaxy S24 5G, 256GB Storage, 8GB RAM, Amber Yellow, premium AI tools built-in.",
                category: "Mobile and Tablets",
                originalPrice: 74999,
                discountPrice: 67999,
                stock: 20,
                query: "samsung galaxy phone s24",
                shopId: techShop._id,
                shop: techShop
            },

            // --- Music and Gaming (TechZone) ---
            {
                name: "AirPods Pro",
                description: "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C) and Active Noise Cancelling.",
                category: "Music and Gaming",
                originalPrice: 24999,
                discountPrice: 21999,
                stock: 35,
                query: "airpods pro earbuds",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Sony Headphones",
                description: "Sony WH-1000XM4 Wireless Noise Cancelling Overhead Headphones with Mic, 30 Hours Battery Life.",
                category: "Music and Gaming",
                originalPrice: 29999,
                discountPrice: 19999,
                stock: 30,
                query: "sony wh-1000xm4 headphones",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Gaming Mouse",
                description: "Logitech G502 Hero High Performance Wired Gaming Mouse, 25,600 DPI, RGB customizable lights.",
                category: "Music and Gaming",
                originalPrice: 4999,
                discountPrice: 3999,
                stock: 50,
                query: "gaming mouse rgb",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Mechanical Keyboard",
                description: "Keychron K2 Wireless Mechanical Keyboard, 84 Keys, RGB Backlight, Gateron G Pro Blue Switch.",
                category: "Music and Gaming",
                originalPrice: 8999,
                discountPrice: 7499,
                stock: 40,
                query: "mechanical keyboard rgb",
                shopId: techShop._id,
                shop: techShop
            },

            // --- Accesories (TechZone / FashionHub) ---
            {
                name: "Power Bank",
                description: "Anker Power Bank, 20,000mAh Portable Charger with PowerIQ Technology and USB-C inputs.",
                category: "Accesories",
                originalPrice: 2999,
                discountPrice: 2499,
                stock: 60,
                query: "power bank battery",
                shopId: techShop._id,
                shop: techShop
            },
            {
                name: "Watch",
                description: "Minimalist Analog Quartz Wristwatch with Premium Leather Strap and scratch-proof glass.",
                category: "Accesories",
                originalPrice: 4999,
                discountPrice: 3499,
                stock: 35,
                query: "analog wrist watch leather",
                shopId: fashionShop._id,
                shop: fashionShop
            },
            {
                name: "Sunglasses",
                description: "Classic Wayfarer Polarized Sunglasses, UV400 Protection for Men and Women.",
                category: "Accesories",
                originalPrice: 1999,
                discountPrice: 1299,
                stock: 80,
                query: "polarized wayfarer sunglasses",
                shopId: fashionShop._id,
                shop: fashionShop
            },

            // --- Shoes (FashionHub) ---
            {
                name: "Nike Air Max",
                description: "Nike Air Max Comfort Running Shoes, Lightweight and Durable Air Cushioning sole.",
                category: "Shoes",
                originalPrice: 8999,
                discountPrice: 6999,
                stock: 25,
                query: "nike air max shoes",
                shopId: fashionShop._id,
                shop: fashionShop
            },
            {
                name: "Puma Sneakers",
                description: "Puma Classic Suede Sneakers, Everyday Casual Wear with Soft Foam Insole padding.",
                category: "Shoes",
                originalPrice: 5999,
                discountPrice: 4499,
                stock: 30,
                query: "puma sneakers suede",
                shopId: fashionShop._id,
                shop: fashionShop
            },

            // --- Cloths (FashionHub) ---
            {
                name: "Levis Jeans",
                description: "Levi's Men's 511 Slim Fit Stretch Denim Jeans, Durable and Versatile everyday wear.",
                category: "Cloths",
                originalPrice: 3999,
                discountPrice: 2799,
                stock: 45,
                query: "levis blue jeans",
                shopId: fashionShop._id,
                shop: fashionShop
            },
            {
                name: "Hoodie",
                description: "Unisex Premium Cotton Fleece Pullover Hoodie, Super Warm and Cozy relaxed fit.",
                category: "Cloths",
                originalPrice: 2499,
                discountPrice: 1799,
                stock: 50,
                query: "pullover hoodie streetwear",
                shopId: fashionShop._id,
                shop: fashionShop
            },
            {
                name: "Jacket",
                description: "Classic Brown Leather Bomber Jacket with Zipper Pockets and Warm quilted interior lining.",
                category: "Cloths",
                originalPrice: 7999,
                discountPrice: 5999,
                stock: 20,
                query: "brown leather jacket",
                shopId: fashionShop._id,
                shop: fashionShop
            },

            // --- Others (BookNest / HomeComfort / SportsElite) ---
            // Books
            {
                name: "Atomic Habits",
                description: "Atomic Habits by James Clear: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
                category: "Others",
                originalPrice: 699,
                discountPrice: 499,
                stock: 120,
                query: "habits book",
                shopId: bookShop._id,
                shop: bookShop
            },
            {
                name: "Deep Work",
                description: "Deep Work: Rules for Focused Success in a Distracted World by Cal Newport.",
                category: "Others",
                originalPrice: 599,
                discountPrice: 399,
                stock: 90,
                query: "focused work reading book",
                shopId: bookShop._id,
                shop: bookShop
            },
            {
                name: "Clean Code",
                description: "Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin.",
                category: "Others",
                originalPrice: 2999,
                discountPrice: 2499,
                stock: 50,
                query: "programming book coding",
                shopId: bookShop._id,
                shop: bookShop
            },
            {
                name: "Rich Dad Poor Dad",
                description: "Rich Dad Poor Dad by Robert T. Kiyosaki: What the Rich Teach Their Kids About Money.",
                category: "Others",
                originalPrice: 499,
                discountPrice: 349,
                stock: 110,
                query: "money stack books finance",
                shopId: bookShop._id,
                shop: bookShop
            },
            {
                name: "Think and Grow Rich",
                description: "Think and Grow Rich by Napoleon Hill: The Landmark Bestseller Now Revised and Updated.",
                category: "Others",
                originalPrice: 399,
                discountPrice: 299,
                stock: 100,
                query: "inspirational book",
                shopId: bookShop._id,
                shop: bookShop
            },
            {
                name: "The Pragmatic Programmer",
                description: "The Pragmatic Programmer: Your Journey To Mastery by David Thomas and Andrew Hunt.",
                category: "Others",
                originalPrice: 3499,
                discountPrice: 2999,
                stock: 45,
                query: "computer science programming code",
                shopId: bookShop._id,
                shop: bookShop
            },
            // Home
            {
                name: "Office Chair",
                description: "Ergonomic Office Chair with High Back, Lumbar Support, Adjustable Armrests and Breathable Mesh.",
                category: "Others",
                originalPrice: 12999,
                discountPrice: 9999,
                stock: 15,
                query: "ergonomic office chair mesh",
                shopId: homeShop._id,
                shop: homeShop
            },
            {
                name: "Study Table",
                description: "Modern Study Table and Computer Desk with high quality Wooden Top and Heavy Duty Metal Frame.",
                category: "Others",
                originalPrice: 8999,
                discountPrice: 6499,
                stock: 10,
                query: "modern study desk wood",
                shopId: homeShop._id,
                shop: homeShop
            },
            {
                name: "Wall Clock",
                description: "Silent Non-Ticking Decorative Wall Clock, Modern Design for Living Room, Office and Bedroom.",
                category: "Others",
                originalPrice: 1499,
                discountPrice: 999,
                stock: 40,
                query: "modern wall clock silent",
                shopId: homeShop._id,
                shop: homeShop
            },
            {
                name: "LED Lamp",
                description: "Dimmable LED Desk Lamp with USB Charging Port, 5 Color Modes and 10 Brightness Levels.",
                category: "Others",
                originalPrice: 2499,
                discountPrice: 1799,
                stock: 50,
                query: "led desk lamp reading",
                shopId: homeShop._id,
                shop: homeShop
            },
            {
                name: "Plant Pot",
                description: "Ceramic Planter Pot with Wooden Stand, Sleek Mid-Century Design for Indoor House Plants.",
                category: "Others",
                originalPrice: 1999,
                discountPrice: 1499,
                stock: 35,
                query: "ceramic planter pot plant",
                shopId: homeShop._id,
                shop: homeShop
            },
            {
                name: "Coffee Table",
                description: "Round Wooden Coffee Table for Living Room with Solid Beech Wood Legs and Storage Shelf.",
                category: "Others",
                originalPrice: 6999,
                discountPrice: 4999,
                stock: 8,
                query: "wooden coffee table round",
                shopId: homeShop._id,
                shop: homeShop
            },
            // Sports
            {
                name: "Football",
                description: "FIFA Quality Pro Match Football, High Durability and Precision Aerodynamic Flight Technology.",
                category: "Others",
                originalPrice: 2499,
                discountPrice: 1799,
                stock: 40,
                query: "soccer ball football sport",
                shopId: sportsShop._id,
                shop: sportsShop
            },
            {
                name: "Nike Jordan",
                description: "Amazing crafted nike shoes for men.",
                category: "Shoes",
                originalPrice: 1999,
                discountPrice: 1499,
                stock: 30,
                query: "nike jordan men",
                shopId: sportsShop._id,
                shop: sportsShop
            },
            {
                name: "Cricket Leather Ball",
                description: "Premium Quality Leather Cricket Ball.",
                category: "Others",
                originalPrice: 799,
                discountPrice: 599,
                stock: 12,
                query: "cricket leather ball",
                shopId: sportsShop._id,
                shop: sportsShop
            },
            {
                name: "Yoga Mat",
                description: "Eco-Friendly Anti-Tear Yoga Mat with Body Alignment Lines, Extra Thick 6mm Non-Slip Surface.",
                category: "Others",
                originalPrice: 1499,
                discountPrice: 999,
                stock: 60,
                query: "yoga mat rolled",
                shopId: sportsShop._id,
                shop: sportsShop
            },
            {
                name: "Dumbbells",
                description: "Hex Dumbbells Pair (5kg x 2) with Protective Rubber Coating and Ergonomic Chrome Handles.",
                category: "Others",
                originalPrice: 2999,
                discountPrice: 2299,
                stock: 25,
                query: "hex dumbbells gym",
                shopId: sportsShop._id,
                shop: sportsShop
            },
            {
                name: "Skipping Rope",
                description: "High-Speed Jump Rope with Ball Bearings and Adjustable Steel Cable for Workout Fitness.",
                category: "Others",
                originalPrice: 799,
                discountPrice: 499,
                stock: 100,
                query: "jump rope skipping fitness",
                shopId: sportsShop._id,
                shop: sportsShop
            }
        ];

        console.log("Resolving dynamic Unsplash image URLs for products...");
        const products = [];
        for (let i = 0; i < productTemplates.length; i++) {
            const template = productTemplates[i];
            console.log(`[${i + 1}/${productTemplates.length}] Fetching image for: "${template.name}"...`);
            const imageUrl = await getImage(template.query);
            
            // Push constructed product document
            products.push({
                name: template.name,
                description: template.description,
                category: template.category,
                originalPrice: template.originalPrice,
                discountPrice: template.discountPrice,
                stock: template.stock,
                images: [imageUrl],
                shopId: template.shopId,
                shop: template.shop
            });

            // Tiny delay to avoid rate limiting issues
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log("Inserting products to MongoDB...");
        const createdProducts = await Product.insertMany(products);
        console.log("Products inserted successfully.");

        // Define Event Products for "Vendoz Super Sale" with extra 50% off
        const eventProducts = [
            {
                name: "Vendoz Super Sale - MacBook Pro",
                description: "VENDOZ SUPER SALE EVENT! Get the Apple MacBook Pro with M3 chip at an extra 50% off!",
                category: "Computers and Laptops",
                originalPrice: 149999,
                discountPrice: 74999, // 50% off standard discountPrice (149999)
                stock: 5,
                images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800"],
                shopId: techShop._id,
                shop: techShop,
                start_Date: new Date(),
                Finish_Date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: "Running"
            },
            {
                name: "Vendoz Super Sale - Nike Air Max",
                description: "VENDOZ SUPER SALE EVENT! Premium Nike Air Max running shoes at an extra 50% off!",
                category: "Shoes",
                originalPrice: 6999,
                discountPrice: 3499, // 50% off standard discountPrice (6999)
                stock: 10,
                images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
                shopId: fashionShop._id,
                shop: fashionShop,
                start_Date: new Date(),
                Finish_Date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: "Running"
            },
            {
                name: "Vendoz Super Sale - Atomic Habits",
                description: "VENDOZ SUPER SALE EVENT! Atomic Habits by James Clear at an extra 50% off!",
                category: "Others",
                originalPrice: 499,
                discountPrice: 249, // 50% off standard discountPrice (499)
                stock: 50,
                images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"],
                shopId: bookShop._id,
                shop: bookShop,
                start_Date: new Date(),
                Finish_Date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: "Running"
            }
        ];

        console.log("Inserting events to MongoDB...");
        await Event.insertMany(eventProducts);
        console.log("Marketplace Seeded successfully with " + products.length + " products, " + eventProducts.length + " events, and " + createdShops.length + " shops.");
        
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};

seedData();