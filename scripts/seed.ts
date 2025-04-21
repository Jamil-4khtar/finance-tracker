import mongoose from "mongoose";
import dotenv from "dotenv";
import Transaction from "../models/Transaction";
import Budget from "../models/Budget";

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
    date: "2025-04-15",
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
    date: "2025-04-28",
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
  {
    date: "2025-04-01",
    amount: 85.50,
    category: "Food",
    description: "Grocery shopping",
    type: "expense"
  },
  {
    date: "2025-04-03",
    amount: 45.00,
    category: "Transport",
    description: "Gas station fill-up",
    type: "expense"
  },
  {
    date: "2025-04-05",
    amount: 120.00,
    category: "Shopping",
    description: "New clothes",
    type: "expense"
  },
  {
    date: "2025-04-07",
    amount: 65.00,
    category: "Food",
    description: "Restaurant dinner",
    type: "expense"
  },
  {
    date: "2025-04-10",
    amount: 30.00,
    category: "Entertainment",
    description: "Movie tickets",
    type: "expense"
  },
  {
    date: "2025-04-12",
    amount: 75.00,
    category: "Health",
    description: "Pharmacy",
    type: "expense"
  },
  {
    date: "2025-04-15",
    amount: 95.50,
    category: "Food",
    description: "Weekly groceries",
    type: "expense"
  },
  {
    date: "2025-04-18",
    amount: 55.00,
    category: "Transport",
    description: "Uber rides",
    type: "expense"
  },
  {
    date: "2025-04-20",
    amount: 25.00,
    category: "Other",
    description: "Office supplies",
    type: "expense"
  }
];

const budgets = [
  {
    category: "Food",
    amount: 500,
    month: "2025-04"
  },
  {
    category: "Transport",
    amount: 200,
    month: "5-04"
  },
  {
    category: "Shopping",
    amount: 300,
    month: "2025-04"
  },
  {
    category: "Health",
    amount: 150,
    month: "2025-04"
  },
  {
    category: "Entertainment",
    amount: 200,
    month: "2025-04"
  },
  {
    category: "Other",
    amount: 100,
    month: "2025-04"
  },
  
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Clear existing data
    await Transaction.deleteMany({});
    await Budget.deleteMany({});
    
    // Insert new data
    await Transaction.insertMany(seedTransactions);
    await Budget.insertMany(budgets);
    
    // console.log('Budget seed data inserted successfully');
    console.log("Database seeded!");
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();