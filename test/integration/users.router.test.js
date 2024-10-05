import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";
import User from "../../src/models/User.js";
import { connectDB, closeDB } from "../../src/database.js";
import testData from "../fixture/testData.js";

before(async () => {
  await connectDB();
});

after(async () => {
  await closeDB();
});

describe("Users API integration tests", () => {
  describe("GET /api/users", () => {
    describe("Testing empty database", () => {
      it("should return a status of 200 and an empty array of users", async () => {
        const response = await request(app)
          .get("/api/users")
          .expect(200)
          .expect("Content-Type", /json/);

        expect(response.body).to.be.an("array").that.is.empty;
      });
    });

    describe("Testing database with 3 users", () => {
      before(async () => {
        await User.create(testData.users);
      });

      it("should return a status of 200 and an array of 3 users", async () => {
        const response = await request(app)
          .get("/api/users")
          .expect(200)
          .expect("Content-Type", /json/);

        expect(response.body).to.be.an("array").lengthOf(3);
      });
    });

    after(async () => {
      await User.deleteMany({});
    });
  });

  describe("GET /api/users/:userId", () => {
    describe("Testing an existing user with a valid user ID", () => {
      let user;

      before(async () => {
        user = await User.create(testData.user);
      });

      it("should return a status of 200 and a user object", async () => {
        const userId = user._id;
        const response = await request(app)
          .get(`/api/users/${userId}`)
          .expect(200)
          .expect("Content-Type", /json/);

        expect(response.body).to.be.an("object");
        expect(response.body).to.include.all.keys(
          "username",
          "email",
          "password",
          "role"
        );
        expect(response.body.username).to.equal(user.username);
        expect(response.body.email).to.equal(user.email);
        expect(response.body.role).to.equal(user.role);
      });

      after(async () => {
        await User.deleteMany({});
      });
    });

    describe("Testing invalid user ID", () => {
      it("should return a status of 400 and message: Invalid user ID", async () => {
        const userId = "343trfe";
        const response = await request(app)
          .get(`/api/users/${userId}`)
          .expect(400)
          .expect("Content-Type", /json/);

        expect(response.body).to.be.an("object");
        expect(response.body).to.include.all.keys("status", "message");
        expect(response.body.message).to.equal("Invalid user ID");
      });
    });

    describe("Testing user not found", () => {
      it("should return a status of 404 and message: User not found", async () => {
        const userId = "66fdc941c0c08c8c4a4c4d62";
        const response = await request(app)
          .get(`/api/users/${userId}`)
          .expect(404)
          .expect("Content-Type", /json/);

        expect(response.body).to.be.an("object");
        expect(response.body).to.include.all.keys("status", "message");
        expect(response.body.message).to.equal("User not found");
      });
    });

    after(async () => {
      await User.deleteMany({});
    });
  });
});
