import createName from "../Modules/createName"


it("Generates a random name if user doesn't provide it", () => {
    const value = createName();
    const first4 = value.substring(0, 5)
    expect(value).toHaveLength(9);
    expect(first4).toBe('Guess');
  });