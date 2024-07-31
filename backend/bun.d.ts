declare module "bun" {
  interface Env {
    PORT: string;

    DB_URL: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_LOGGING: string;

    JWT_SECRET: string;
  }
}

type Maybe<T> = T | undefined;
