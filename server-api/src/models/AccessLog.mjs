// External imports
import mongoose from "mongoose";

// Descruct mongoose
const { Schema, model } = mongoose;

// Define schema
const AccessLogSchema = new Schema({
  rawLog: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  requestTime: {
    type: Date,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  requestPath: {
    type: String,
    required: true
  },
  httpVersion: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  requestSize: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Export Schema
export default model("AccessLog", AccessLogSchema);
