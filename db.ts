import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import { User } from "./user.entity";

export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: "postgres",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

sequelize.addModels([User]);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
