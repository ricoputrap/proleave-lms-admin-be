import Repository from "../../../interfaces/repository";
import { DeleteReturnType } from "../../../types/api.types";
import FeatureModel from "../model";
import { IFeature, IFeatureNew } from "../types";
import crypto from "node:crypto";

class FeatureRepository implements Repository<IFeature, IFeatureNew> {
  getAll = async (): Promise<IFeature[]>  => {
    try {
      const features: IFeature[] = await FeatureModel.find();
      return features;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  getSingle = async (filter: any): Promise<IFeature | null> => {
    try {
      const feature: IFeature | null = await FeatureModel.findOne(filter);
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  addNew = async (data: IFeatureNew): Promise<IFeature> => {
    try {
      const _id: string = crypto.randomUUID();
      const feature: IFeature = await FeatureModel.create(data);
      return feature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  editOne = async (id: string, data: IFeatureNew): Promise<IFeature | null | undefined> => {
    try {
      const filter = { _id: id };

      const updatedFeature: IFeature | null | undefined = await FeatureModel.findOneAndUpdate(filter, data);
      if (!!updatedFeature) updatedFeature.name = data.name;
      
      return updatedFeature;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }

  deleteOne = async (id: string): Promise<Boolean> => {
    try {
      const filter = { _id: id };
      const res: DeleteReturnType = await FeatureModel.deleteOne(filter);
      
      return !!res.deletedCount;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }
}

export default FeatureRepository;