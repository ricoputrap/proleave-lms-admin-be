import { stringToHash } from ".";

describe("stringToHash()", () => {
  test("should give hash number based on a given string", () => {
    const name: string = "New Feature";
    const hash: number = stringToHash(name);
    expect(hash).toBe(-814194634);
  });

  test("should return 0 if no using empty string", () => {
    const hash: number = stringToHash("");
    expect(hash).toBe(0);
  })
})