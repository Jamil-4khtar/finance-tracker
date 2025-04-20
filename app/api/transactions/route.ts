import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const data = await request.json();
  const transaction = await Transaction.create(data);
  return NextResponse.json(transaction);
}