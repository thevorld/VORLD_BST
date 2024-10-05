import { ErrorHandler } from "../../types/errorHandler";

export const createUser = (username: string, email: string) => {
  try {
    // Logic to create a user
    return { id: "123", username, email }; // Example response
  } catch (error) {
    throw new ErrorHandler(500, "Failed to create user");
  }
};

export const getUserById = (id: string) => {
  try {
    // Logic to retrieve a user by ID
    return { id, username: "exampleUser", email: "user@example.com" }; // Example response
  } catch (error) {
    throw new ErrorHandler(404, "User not found");
  }
};
