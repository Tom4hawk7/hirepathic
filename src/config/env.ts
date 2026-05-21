export const env = {
    DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://localhost:5432/devdb",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
    JWT_SECRET: process.env.JWT_SECRET! ?? "lGKnBLtWTDP7cgnMkK1OMFSJ84sSKCuvHcR7RhP7U1e",
}