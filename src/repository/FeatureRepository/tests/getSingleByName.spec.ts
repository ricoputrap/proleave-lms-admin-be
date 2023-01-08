import FeatureRepository from ".."
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("getSingleFeatureByName", () => {
  let repository: FeatureRepository;

  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should return a feature", async () => {
    const feature: IFeature = {
      _id: "12344",
      name: "Feature XYZ"
    }

    jest.spyOn(FeatureModel, "findOne").mockResolvedValue(feature);

    const name: string = "Feature XYZ";
    const result: IFeature | null = await repository.getSingleFeatureByName(name);
    expect(result).toEqual(feature);
  });

  test("should throw error messages when getting a feature by name", async () => {
    const error = new Error("Error getting a feature by name");
    jest.spyOn(FeatureModel, "findOne").mockRejectedValue(error);

    try {
      const name: string = "Feature XYZ";
      await repository.getSingleFeatureByName(name);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  })
})