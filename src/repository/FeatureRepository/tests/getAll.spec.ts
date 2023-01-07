import FeatureRepository from "..";
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("getAllFeatures", () => {
  let repository: FeatureRepository;

  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should return an array of features", async () => {
    const result: IFeature[] = [
      { _id: "1", name: "Feature 1" },
      { _id: "2", name: "Feature 2" },
      { _id: "3", name: "Feature 3" },
    ];

    // mock implementation of FeatureModel.find()
    jest.spyOn(FeatureModel, "find").mockResolvedValue(result);

    expect(await repository.getAllFeatures()).toEqual(result);
  });

  test("should throw error message when getting all features", async () => {
    const error = new Error("Error getting all features");
    jest.spyOn(FeatureModel, "find").mockRejectedValue(error);

    try {
      await repository.getAllFeatures();
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  });
});