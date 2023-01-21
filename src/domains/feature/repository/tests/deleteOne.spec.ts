import { DeleteResult } from "mongodb";
import FeatureRepository from "..";
import Repository from "../../../../interfaces/repository";
import FeatureModel from "../../model";
import { IFeature, IFeatureNew } from "../../types";

describe("FeatureRepository - deleteOne()", () => {
  const featureID: string = "1";
  const result: DeleteResult = {
    acknowledged: true,
    deletedCount: 1
  }

  let repository: Repository<IFeature, IFeatureNew>;
  beforeAll(() => {
    repository = new FeatureRepository();
  });

  // should success deleting a feature
  test("should success deleting a feature", async () => {
    jest.spyOn(FeatureModel, "deleteOne").mockResolvedValue(result);

    const res: Boolean = await repository.deleteOne(featureID);
    expect(res).toBe(true);
  })

  // should throw an error message when deleting a feature
  test("should throw an error message when deleting a feature", async () => {
    const error = new Error("Error deleting a feature");
    jest.spyOn(FeatureModel, "deleteOne").mockRejectedValue(error);

    try {
      await repository.deleteOne(featureID);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  });
});