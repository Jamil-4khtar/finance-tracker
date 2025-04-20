import { Schema, Document, models, model } from "mongoose";

export interface IBudget extends Document {
  category: string;
  amount: number;
  month: string; // Format: "YYYY-MM"
}

const BudgetSchema = new Schema<IBudget>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
});

export default models.Budget || model<IBudget>("Budget", BudgetSchema);