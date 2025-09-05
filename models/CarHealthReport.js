import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  ownerName: String,
  carModel: String,
  registration: String,
  odometer: String,
  reportId: String,
  healthScore: String,
  batteryStatus: String,
  batteryVoltage: String,
  coolantTemp: String,
  coolantStatus: String,
  engineCodes: String,
  tyreStatus: String,
  lightsStatus: String,
  batteryPrediction: String,
  tyrePrediction: String,
  enginePrediction: String,
  lastWash: String,
  lastScan: String,
  totalReports: String,
  additionalNotes: { type: String },
  generatedDate: String,
  predictiveNotes: [String],
  serviceRecommendations: [String],
}, { timestamps: true });

export default mongoose.model("CarHealthReport", reportSchema);
