const mongoose = require("mongoose");
const { Schema } = mongoose;

const featureSchema = new Schema({
  feature: { type: String, required: true },
  available: { type: Boolean, required: true },
});

const pricePlanSchema = new Schema({
  name: { type: String, required: true },
  monthlyPrice: { type: Number, required: true },
  annualPrice: { type: Number, required: true },
  description: { type: String, required: true },
  features: { type: [featureSchema], required: true },
  mostPopular: { type: Boolean, default: false },
});

const PricePlan = mongoose.model("PricePlan", pricePlanSchema);

module.exports = PricePlan;
