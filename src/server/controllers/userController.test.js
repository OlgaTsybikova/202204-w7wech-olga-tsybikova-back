const User = require("../../database/models/User");
const { loadUsers } = require("./userControllers");

describe("Given a loadUsers function", () => {
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
      const expectedUsers = {
        users: [
          {
            id: 22,
            name: "Bookie",
          },
        ],
      };
      User.find = jest.fn().mockResolvedValue(usersMock);
      const expectedStatusCode = 200;

      await loadUsers(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });
});
