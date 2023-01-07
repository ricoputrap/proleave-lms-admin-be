import FeatureRepository from ".."
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";

describe("editFeature", () => {
  const featureID: string = "1";
  const updatedName: string = "Edited Feature";
  const editedFeature: IFeature = {
    _id: "1",
    name: "Edited Feature"
  }

  let repository: FeatureRepository;
  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should success editing a feature", async () => {
    jest.spyOn(FeatureModel, "findOneAndUpdate").mockResolvedValue(editedFeature);
    
    const feature: IFeature | null | undefined = await repository.editFeature(featureID, updatedName);
    expect(feature).toEqual(editedFeature);
  });

  test("should handle error when editing a feature", async () => {
    const error = new Error("Error editing a feature");
    jest.spyOn(FeatureModel, "findOneAndUpdate").mockRejectedValue(error);

    try {
      await repository.editFeature(featureID, updatedName);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  }); 
})