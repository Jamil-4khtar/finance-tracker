import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Budget from "@/models/Budget";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params
  const data = await request.json();
  const updated = await Budget.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params
  const deleted = await Budget.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}