import { FGetSingleItem } from "../types/api.types";

class Service {

  /**
   * Check If Exist
   * ==============
   * Validate if item exists based on the filtering result.
   * @param getSingleItem a function that will be called to retrieve an item
   * @param filter a filter that will be used in retrieving an item using `getSingleItem()`
   * @returns true if the item exists, false otherwise
   */
  protected async checkIfExist<T>(
    getSingleItem: FGetSingleItem<T>,
    filter: any
  ): Promise<boolean> {
    try {
      const item: T | null = await getSingleItem(filter);
      return item !== null;
    }
    catch (error: any) {
      const message = (error as Error).message;
      throw message;
    }
  }
}

export default Service;