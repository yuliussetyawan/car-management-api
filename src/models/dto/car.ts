interface CarRequest {
  car_name: string;
  car_size: string;
  car_rent_price: number;
  car_photo?: Express.Multer.File;
}

export { CarRequest };
