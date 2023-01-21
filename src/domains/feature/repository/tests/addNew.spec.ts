import FeatureRepository from "..";
import Repository from "../../../../interfaces/repository";
import FeatureModel from "../../model";
import { IFeature, IFeatureNew } from "../../types";

describe("FeatureRepository - addNew()", () => {
  const newFeature: IFeatureNew = {
    name: "New Feature"
  }

  let repository: Repository<IFeature, IFeatureNew>;

  beforeAll(() => {
    repository = new FeatureRepository();
  });
  
  // should success adding a feature
  test("should success adding a feature", async () => {
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(newFeature);
      });
    });

    const feature: IFeature = await repository.addNew(newFeature);
    expect(feature).toEqual(newFeature);
  });

  // should throw an error message when adding a new feature
  test("should throw an error message when adding a new feature", async () => {
    const error = new Error("Error adding a new feature");
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(error);
      })
    })

    try {
      await repository.addNew(newFeature);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  })
});