import FeatureModel from "../../models/FeatureModel";
import { IFeature } from "../../types/models.types";
import crypto from "node:crypto";

class FeatureRepository {
  
  getAllFeatures = async (): Promise<IFeature[]> => {
    try {
      const features: IFeature[] = await FeatureModel.find();
      return features;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  getSingleFeatureByID = async (id: number): Promise<IFeature | null> => {
    try {
      const feature: IFeature | null = await FeatureModel.findById(id);
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  addNewFeature = async (name: string): Promise<IFeature> => {
    try {
      const _id: string = crypto.randomUUID();
      const feature: IFeature = await FeatureModel.create({ _id, name });
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  // editFeature = async (_id: number, name: string): Promise<IFeature | null | undefined> => {

  // }

  // deleteFeature = async (_id: number): Promise<DeleteReturnType> => {

  // }
}

export default FeatureRepository;