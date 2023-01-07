import FeatureRepository from "..";
import FeatureModel from "../../../models/FeatureModel";
import { DeleteReturnType } from "../../../types/api.types";
import { DeleteResult } from "mongodb";

describe("deleteFeature", () => {
  const featureID: string = "1";

  const result: DeleteResult = {
    acknowledged: true,
    deletedCount: 1
  }

  let repository: FeatureRepository;
  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should success deleting a feature", async () => {
    jest.spyOn(FeatureModel, "deleteOne").mockResolvedValue(result);

    const res: DeleteReturnType = await repository.deleteFeature(featureID);
    expect(res).toEqual(result);
  });

  test("should throw error message when deleting a feature", async () => {
    const error = new Error("Error deleting a feature");
    jest.spyOn(FeatureModel, "deleteOne").mockRejectedValue(error);

    try {
      await repository.deleteFeature(featureID);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  })
})