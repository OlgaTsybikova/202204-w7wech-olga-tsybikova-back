const User = require("../../database/models/User");
const { getUsers } = require("./userControllers");

describe("Given a getUser function", () => {
  describe("When it receives a request correctly", () => {
    test("Then it should response with a method status 200 and a user", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const usersMock = [
        {
          id: 22,
          name: "Bookie",
        },
      ];

      User.find = jest.fn().mockResolvedValue(usersMock);

      const expectedStatusCode = 200;

      await getUsers(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(usersMock);
    });
  });
});
