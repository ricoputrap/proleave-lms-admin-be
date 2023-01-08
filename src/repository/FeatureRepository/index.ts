import FeatureModel from "../../models/FeatureModel";
import { DeleteReturnType } from "../../types/api.types";
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

  getSingleFeatureByID = async (id: string): Promise<IFeature | null> => {
    try {
      const feature: IFeature | null = await FeatureModel.findById(id);
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  getSingleFeatureByName = async (name: string): Promise<IFeature | null> => {
    try {
      const feature: IFeature | null = await FeatureModel.findOne({ name });
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

  editFeature = async (_id: string, name: string): Promise<IFeature | null | undefined> => {
    try {
      const filter = { _id };
      const value = { name };

      const updatedFeature: IFeature | null | undefined = await FeatureModel.findOneAndUpdate(filter, value);
      if (!!updatedFeature) updatedFeature.name = name;
      
      return updatedFeature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  deleteFeature = async (_id: string): Promise<DeleteReturnType> => {
    try {
      const filter = { _id };
      const res: DeleteReturnType = await FeatureModel.deleteOne(filter);
      return res;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }
}

export default FeatureRepository;