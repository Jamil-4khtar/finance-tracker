import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/Transaction";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

const seedTransactions = [
  {
    amount: 50.25,
    date: "2024-06-01",
    description: "Groceries",
    category: "Food",
  },
  {
    amount: 120.0,
    date: "2024-06-03",
    description: "Electricity Bill",
    category: "Utilities",
  },
  {
    amount: 15.5,
    date: "2024-06-05",
    description: "Coffee with friends",
    category: "Leisure",
  },
  {
    amount: 200.0,
    date: "2024-05-28",
    description: "Monthly Rent",
    category: "Housing",
  },
  {
    amount: 75.0,
    date: "2024-04-15",
    description: "Internet Bill",
    category: "Utilities",
  },
  {
    amount: 30.0,
    date: "2024-03-22",
    description: "Movie Night",
    category: "Leisure",
  },
  {
    amount: 95.5,
    date: "2024-02-10",
    description: "Grocery Shopping",
    category: "Food",
  },
  {
    amount: 180.0,
    date: "2024-01-05",
    description: "Car Maintenance",
    category: "Transport",
  },
  {
    amount: 60.0,
    date: "2024-05-12",
    description: "Dining Out",
    category: "Food",
  },
  {
    amount: 220.0,
    date: "2024-03-01",
    description: "Monthly Rent",
    category: "Housing",
  },
  {
    amount: 45.0,
    date: "2024-04-28",
    description: "Gym Membership",
    category: "Health",
  },
  {
    amount: 12.0,
    date: "2024-02-18",
    description: "Book Purchase",
    category: "Education",
  },
  {
    amount: 150.0,
    date: "2024-06-10",
    description: "New Shoes",
    category: "Shopping",
  },
  {
    amount: 80.0,
    date: "2024-01-20",
    description: "Electricity Bill",
    category: "Utilities",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Transaction.deleteMany({});
    await Transaction.insertMany(seedTransactions);
    console.log("Database seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();