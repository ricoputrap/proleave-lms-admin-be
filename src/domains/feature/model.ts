import mongoose, { Model, model, Schema } from "mongoose";
import { IFeature } from "./types";

const FeatureSchema = new Schema<IFeature>({
  _id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true }
});

const FeatureModel: Model<IFeature> = mongoose.models.feature
  ? mongoose.models.feature
  : model("feature", FeatureSchema);

export default FeatureModel;