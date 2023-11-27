import express, { Application } from "express";
import UsersHandler from "./handlers/usersHandlers";
import CarsHandler from "./handlers/carsHandlers";
import AuthHandler from "./handlers/authHandlers";
import cloudinaryUpload from "./utils/cloudinaryUpload";
import AuthMiddleware from "./middlewares/auth";

import { Context } from "vm";
import dotenv from "dotenv";
dotenv.config();
import { swaggerConfig } from "./utils/swaggerOptions";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app: Application = express();
const PORT = process.env.APP_PORT || 3001;

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

// swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// users handlers
const usersHandler = new UsersHandler();

// cars handlers
const carsHandler = new CarsHandler();

// auth handlers
const authHandler = new AuthHandler();

// users routes
app.get(
  "/api/users",
  AuthMiddleware.authenticateSuper,
  usersHandler.getUsersByName
);
app.get(
  "/api/users/:id",
  AuthMiddleware.authenticateAdmin,
  usersHandler.getUsersById
);
app.post(
  "/api/users",
  AuthMiddleware.authenticateAdmin,
  cloudinaryUpload.single("profile_picture_url"),
  usersHandler.createUser
);
app.delete(
  "/api/users/:id",
  AuthMiddleware.authenticateAdmin,
  usersHandler.deleteUserById
);
app.patch(
  "/api/users/:id",
  AuthMiddleware.authenticateAdmin,
  cloudinaryUpload.single("profile_picture_url"),
  usersHandler.updateUserById
);

// cars routes
app.get("/api/cars", AuthMiddleware.authenticateAdmin, carsHandler.getCars);
app.get(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.getCarById
);
app.get(
  "/api/cars/category/:size",
  AuthMiddleware.authenticateAdmin,
  carsHandler.getCarBySize
);
app.post(
  "/api/cars",
  AuthMiddleware.authenticateAdmin,
  cloudinaryUpload.single("car_photo"),
  carsHandler.uploadCar
);
app.patch(
  "/api/cars/:id",
  cloudinaryUpload.single("car_photo"),
  AuthMiddleware.authenticateAdmin,
  carsHandler.updateCarById
);
app.delete(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.deleteCarById
);

// auth routes
app.get(
  "/api/auth/me",
  AuthMiddleware.authenticate,
  authHandler.getLoggedInUser
);
app.post(
  "/api/auth/admin-registration",
  AuthMiddleware.authenticateSuper,
  authHandler.adminRegister
);
app.post("/api/auth/member-register", authHandler.register);
app.post("/api/auth/login", authHandler.login);


// start server
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
