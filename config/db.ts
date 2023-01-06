import mongoose from "mongoose";
import { MONGO_URI } from "./env";

const startDbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("===== DATABASE CONNECTED =====");
  }
  catch (error: any) {
    console.log("===== DATABASE CONNECTION ERROR:", error);
    process.exit();
  }
}

export default startDbConnection;