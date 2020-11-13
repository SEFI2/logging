// External imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

// Internal imports
import startListenLogs from "./src/logs/listener.mjs";
import setupRoutes from "./src/routes/index.mjs";

// Initialize app
const app = express();
const router = express.Router();
dotenv.config();

// Connect to MongoDB
const mongodbUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

// Setup routes
setupRoutes(router);

// Setup middlewares and router
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use("/api", router);

// Start to listen log file
const logsPath = process.env.LOG_PATH;
startListenLogs(logsPath);

// Initialize port and start to listen to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
