export default {
  JWT: {
    secret: process.env["JWT_SECRET"] || "123456",
    expiresIn: "1h",
  },
  DATABASE: {
    url: process.env["DATABASE_URL"] || "postgres://postgres:123456@localhost:5432/book_my_ticket",
  },
  PORT: process.env["PORT"] || 3000,
  HOST: process.env["HOST"] || "localhost",
  NODE_ENV: process.env["NODE_ENV"] || "development",
  APP_URL: process.env["APP_URL"] || "http://localhost:3000",
  
}