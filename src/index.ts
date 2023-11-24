import express, { Application } from "express";
import CarsHandler from "./handlers/cars";
import cloudinaryUpload from "./utils/cloudinaryUpload";
import AuthMiddleware from "./middlewares/auth";
import AuthHandler from "./handlers/auth";
import { Context } from "vm";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const PORT: number = 3001;

app.use(express.json());

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
  }
}

// Cars Handlers
const carsHandler = new CarsHandler();

// Auth Handlers
const authHandler = new AuthHandler();

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

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
