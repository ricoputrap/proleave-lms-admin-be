import FeatureRepository from ".."
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("getSingleFeature", () => {
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

    const filter = { name: "Feature XYZ" }
    const result: IFeature | null = await repository.getSingleFeature(filter);
    expect(result).toEqual(feature);
  });

  test("should throw error messages when getting a feature by name", async () => {
    const error = new Error("Error getting a feature by name");
    jest.spyOn(FeatureModel, "findOne").mockRejectedValue(error);

    try {
      const filter = { name: "Feature XYZ" }
      await repository.getSingleFeature(filter);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  })
})