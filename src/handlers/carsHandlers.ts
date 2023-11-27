import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { Car } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";
import CarsService from "../services/carsService";

class CarsHandler {
  async getCars(req: Request, res: Response) {
    const carList: Car[] = await CarsService.getCars();

    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carList,
      },
    };

    res.status(200).send(response);
  }

  async getCarById(req: Request, res: Response) {
    const queryId: number = +req.params.id;
    const carList: Car[] = await CarsService.getCarsById(queryId);
    if (carList.length === 0) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carList,
      },
    };
    res.status(200).send(response);
  }

  async getCarBySize(req: Request, res: Response) {
    const querySize: string = req.params.size;
    const carList: Car[] = await CarsService.getCarsBySize(querySize);
    if (carList.length === 0) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }
    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carList,
      },
    };
    res.status(200).send(response);
  }

  async uploadCar(req: Request, res: Response) {
    const payload: CarRequest = req.body;

    payload.car_photo = req.file;

    // Payload validation
    if (
      !(
        payload.car_name &&
        payload.car_size &&
        payload.car_rent_price &&
        payload.car_photo
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message:
          "body fields(car_name, car_size, car_rent_price, and car_photo) cannot be empty",
        data: {
          created_car: null,
        },
      };

      return res.status(400).send(response);
    }

    const createdCar: Car = await CarsService.uploadCar(payload);

    const response: DefaultResponse = {
      status: "CREATED",
      message: "Car succesfully created",
      data: {
        created_car: createdCar,
      },
    };

    res.status(201).send(response);
  }

  async updateCarById(req: Request, res: Response) {
    const queryId: number = +req.params.id;
    const payload: CarRequest = req.body;
    payload.car_photo = req.file;
    
    if (
      !(
        payload.car_name &&
        payload.car_size &&
        payload.car_rent_price &&
        payload.car_photo
      )
    ) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message:
          "body fields(car_name, car_size, car_rent_price, and car_photo) cannot be empty",
        data: {
          updated_car: null,
        },
      };
      res.status(400).send(response);
    }
    const updatedCar: Car | null = await CarsService.updateCarById(
      queryId,
      payload
    );

    if (!updatedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "UPDATED",
      message: "Car successfully updated",
      data: {
        updated_car: updatedCar,
      },
    };
    res.status(200).send(response);
  }

  async deleteCarById(req: Request, res: Response) {
    const queryId: number = +req.params.id;
    const userId = req.user.id as number;
    const deletedCar: Car | null = await 
    CarsService.deleteCarById(queryId, userId);

    if (!deletedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "DELETED",
      message: "Car successfully deleted",
      data: {
        deleted_car: deletedCar,
      },
    };

    res.status(200).send(response);
  }
}

export default CarsHandler;
