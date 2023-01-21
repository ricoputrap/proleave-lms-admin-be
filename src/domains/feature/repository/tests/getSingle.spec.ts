import FeatureRepository from "..";
import Repository from "../../../../interfaces/repository";
import FeatureModel from "../../model";
import { IFeature, IFeatureNew } from "../../types";

describe("FeatureRepository - getSingle()", () => {
  let repository: Repository<IFeature, IFeatureNew>;

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
    const result: IFeature | null = await repository.getSingle(filter);
    expect(result).toEqual(feature);
  });

  test("should throw an error message when getting a feature by any filter", async () => {
    const error = new Error("Error getting a feature by any filter");
    jest.spyOn(FeatureModel, "findOne").mockRejectedValue(error);

    try {
      const filter = { name: "Feature XYZ" }
      await repository.getSingle(filter);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  });
});