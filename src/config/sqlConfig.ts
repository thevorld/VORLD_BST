import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.SQL_URI || "postgres://user:pass@localhost:5432/mydatabase",
  {
    dialect: "postgres",
    logging: false,
  }
);

const connectSQLDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQL database connected successfully");
  } catch (error) {
    console.error("Error connecting to SQL database:", error);
    process.exit(1);
  }
};

export { sequelize, connectSQLDB };
