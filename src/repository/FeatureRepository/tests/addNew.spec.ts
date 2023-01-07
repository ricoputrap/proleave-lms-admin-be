import FeatureRepository from "..";
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("addNewFeature", () => {
  const newFeature: IFeature = {
    _id: "1",
    name: "New Feature"
  }

  let repository: FeatureRepository;
  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should success adding a feature", async () => {
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(newFeature);
      });
    });

    const feature: IFeature = await repository.addNewFeature(newFeature.name);
    expect(feature).toEqual(newFeature);
  });

  test("should handle error when adding a new feature", async () => {
    const error = new Error("Error adding a new feature");
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    })

    try {
      await repository.addNewFeature(newFeature.name);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  });
});