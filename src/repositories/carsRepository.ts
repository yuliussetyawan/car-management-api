import { Car, CarEntity } from "../models/entity/car";

class CarsRepository {
  static async getCars(): Promise<Car[]> {
    const listCar = await CarEntity.query()
      .withGraphFetched("[created_by, update_by, deleted_by]")
      .whereNull("delete_at");
    return listCar;
  }

  static async getCarsById(queryId: number): Promise<Car[]> {
    const listCarById = await CarEntity.query().withGraphFetched("[created_by,updated_by,deleted_by]").where("id", queryId);
    return listCarById;
  }

  static async getCarsBySize(querySize: string): Promise<Car[]> {
    const listCarBySize = await CarEntity.query().withGraphFetched("[created_by,updated_by,deleted_by]").where("car_size", querySize);
    return listCarBySize;
  }

  static async uploadCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      car_name: car.car_name,
      car_size: car.car_size,
      car_rent_price: car.car_rent_price,
      car_photo: car.car_photo,
      create_by: car.create_by,
      create_at: car.create_at,
    });

    return createdCar;
  }

  static async deleteCarById(queryId: number, deletedBy: number): Promise<Car | null> {
    const deletedCar = await CarEntity.query()
      .findById(queryId)
      .whereNull("delete_at");

    if (deletedCar) {
      await CarEntity.query().findById(queryId).patch({
        delete_by: deletedBy,
        delete_at: new Date(),
      });
      return deletedCar;
    } else {
      return null;
    }
  }

  static async updateCarById(queryId: number, car: Car): Promise<Car | null> {
    const updateCar = await CarEntity.query().findById(queryId);

    if (updateCar) {
      await CarEntity.query().findById(queryId).patch({
        car_name: car.car_name,
        car_size: car.car_size,
        car_rent_price: car.car_rent_price,
        car_photo: car.car_photo,
        update_by: car.update_by,
        update_at: car.update_at,
      });
      return updateCar;
    } else {
      return null;
    }
  }
}

export default CarsRepository;
