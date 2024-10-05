const users = [
  {
    username: "User 1",
    email: "user1@example.com",
    password: "password",
    role: "user",
  },
  {
    username: "User 2",
    email: "user2@example.com",
    password: "password",
    role: "user",
  },
  {
    username: "User 3",
    email: "user3@example.com",
    password: "password",
    role: "user",
  },
];

const mixUsers = [
  {
    username: "User 1",
    email: "user1@example.com",
    password: "password",
    role: "user",
  },
  {
    username: "Admin 2",
    email: "admin2@example.com",
    password: "password",
    role: "admin",
  },
  {
    username: "User 3",
    email: "user3@example.com",
    password: "password",
    role: "user",
  },
];

const user = {
  username: "single-user",
  email: "single-user@example.com",
  password: "password",
  role: "user",
};

const admin = {
  username: "single-admin",
  email: "single-admin@example.com",
  password: "password",
  role: "admin",
};

const testData = {
  users,
  mixUsers,
  user,
  admin,
};

export default testData;
