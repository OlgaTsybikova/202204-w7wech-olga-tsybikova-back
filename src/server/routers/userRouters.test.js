const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { app } = require("..");
const connectDB = require("../../database");
const User = require("../../database/models/User");

let mongoServer;
const users = [
  {
    _id: "6287e120d21507acf47e20b6",
    name: "Lorenzo",
    username: "lorenzoa",
    password: "lorenzo1",
    image:
      "https://cdn-1.motorsport.com/images/amp/2wBJob30/s6/jorge-lorenzo-repsol-honda-tea.jpg",
    friends: ["6287e262d21507acf47e20b7"],
    enemies: ["6287e388d21507acf47e20b9"],
  },
  {
    _id: "6287e120d21507acf47e20b7",
    name: "Lorenz",
    username: "lorenzo1",
    password: "lorenzo1",
    image:
      "https://cdn-1.motorsport.com/images/amp/2wBJob30/s6/jorge-lorenzo-repsol-honda-tea.jpg",
    friends: ["6287e262d21507acf47e20b7"],
    enemies: ["6287e388d21507acf47e20b9"],
  },
];

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.create(users[0]);
  await User.create(users[1]);
});
afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a GET/user/load endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should responde with a status code 200 and a length 2", async () => {
      const expectedLength = 2;
      await request(app).get("/user/load").expect(200);

      expect(users).toHaveLength(expectedLength);
    });
  });
});

describe("Given a POST/user/login endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with json", async () => {
      const loggingUser = {
        username: "lorenzo1",
        password: "lorenzo1",
      };

      await request(app)
        .post("/user/login")
        .send(loggingUser)
        .expect("Content-Type", /json/);
    });
  });
});
