import FeatureRepository from "..";
import Repository from "../../../../interfaces/repository";
import FeatureModel from "../../model";
import { IFeature, IFeatureNew } from "../../types";

describe("FeatureRepository - editOne()", () => {
  const featureID: string = "1";
  const newData: IFeatureNew = {
    name: "Edited Feature"
  }

  const editedFeature: IFeature = {
    _id: "1",
    name: "Edited Feature"
  }

  let repository: Repository<IFeature, IFeatureNew>;
  beforeAll(() => {
    repository = new FeatureRepository();
  });

  test("should success editing a feature", async () => {
    jest.spyOn(FeatureModel, "findOneAndUpdate").mockResolvedValue(editedFeature);
    
    const feature: IFeature | null | undefined = await repository.editOne(featureID, newData);
    expect(feature).toEqual(editedFeature);
  });

  test("should throw error message when editing a feature", async () => {
    const error = new Error("Error editing a feature");
    jest.spyOn(FeatureModel, "findOneAndUpdate").mockRejectedValue(error);

    try {
      await repository.editOne(featureID, newData);
      fail(error);
    }
    catch (e: any) {
      expect(e).toEqual(error.message);
    }
  }); 
});