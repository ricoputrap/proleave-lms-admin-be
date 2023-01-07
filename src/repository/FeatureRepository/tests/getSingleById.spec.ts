import FeatureRepository from "..";
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("getSingleFeatureByID", () => {
  let repository: FeatureRepository;

  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should return a feature", async () => {
    const feature: IFeature = {
      _id: 0,
      name: "Feature 1"
    }

    jest.spyOn(FeatureModel, "findById").mockResolvedValue(feature);
    
    const id: number = 0;
    const result: IFeature | null = await repository.getSingleFeatureByID(id);
    expect(result).toEqual(feature);
  });

  test("should throw error message", async () => {
    const error = new Error("Error getting a feature by ID");
    jest.spyOn(FeatureModel, "findById").mockRejectedValue(error);

    try {
      const featureID: number = 0;
      await repository.getSingleFeatureByID(featureID);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  })
})