import dotenv from "dotenv";
dotenv.config();

interface IEnv {
  PORT: string;
  DB_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
}

const requiredVariable = [
  "PORT",
  "DB_URL",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES",
];
const loadEnv = (): IEnv => {
  requiredVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variables ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  };
};

export const envVariable = loadEnv();
