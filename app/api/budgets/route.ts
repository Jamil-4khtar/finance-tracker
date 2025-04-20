import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Budget from "@/models/Budget";

export async function GET() {
  await dbConnect();
  const budgets = await Budget.find().sort({ month: -1, category: 1 });
  return NextResponse.json(budgets);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();
  const budget = await Budget.create(data);
  return NextResponse.json(budget);
}