const auth = require("./auth");

const mockId = { id: 3 };
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

describe("Given a auth function ", () => {
  describe("When it receives a request with a token", () => {
    const req = {
      headers: { authorization: "Bearer " },
    };
    test("It should invoke the function 'next'", () => {
      const next = jest.fn();
      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
