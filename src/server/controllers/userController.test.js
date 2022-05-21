const User = require("../../database/models/User");
const { loadUsers, loginUser } = require("./userControllers");

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

jest.mock("../../database/models/User", () => ({
  findOne: jest.fn().mockResolvedValue(true),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

const expectedToken = "sometokenthatisexpected";

jest.mock("jsonwebtoken", () => ({
  sign: () => expectedToken,
}));

describe("Given a userLogin function", () => {
  describe("When invoked with a request object with a correct username and password", () => {
    test("Then it should call the response status method with 200", async () => {
      const req = {
        body: {
          username: "lorenzo1",
          pasword: "lorenzo1",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expedtecStatus = 200;

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expedtecStatus);
      expect(res.json).toHaveBeenCalledWith({ token: expectedToken });
    });
  });
});
