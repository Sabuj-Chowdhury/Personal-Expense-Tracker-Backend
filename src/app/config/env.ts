import dotenv from "dotenv";
dotenv.config();

interface IEnv {
  PORT: string;
  DB_URL: string;
}

const requiredVariable = ["PORT", "DB_URL"];
const loadEnv = (): IEnv => {
  requiredVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variables ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
  };
};

export const envVariable = loadEnv();
