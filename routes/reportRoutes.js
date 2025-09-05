import express from "express";
import CarHealthReport from "../models/CarHealthReport.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Save new report
// @route POST /api/reports
router.post("/", protect, async (req, res) => {
  try {
    const report = new CarHealthReport({
      ...req.body,
      user: req.user._id,
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: "Error saving report", error: err.message });
  }
});

// @desc Get all reports for logged-in user
// @route GET /api/reports
router.get("/", protect, async (req, res) => {
  try {
    const reports = await CarHealthReport.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports", error: err.message });
  }
});

// @desc Get single report by ID
// @route GET /api/reports/:id
router.get("/:id", async (req, res) => {
  try {
    const report = await CarHealthReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Error fetching report", error: err.message });
  }
});

export default router;
