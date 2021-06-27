import createName from "../Modules/createName"


it("Generates a random name if user doesn't provide it", () => {
    const value = createName();
    expect(value).toHaveLength(9);
  });