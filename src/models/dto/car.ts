import { UserResponse } from "./user";
interface CarRequest {
  car_name: string;
  car_size: string;
  car_rent_price: number;
  car_photo?: Express.Multer.File;
  user_id?: number;
  create_by?: number;
  update_by?: number;
  delete_by?: number;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}
interface CarResponse {
  id: number;
  car_name: string;
  car_rent_price: number;
  car_size: string;
  car_photo?: string;
  created_by: UserResponse;
  updated_by: UserResponse;
  deleted_by: UserResponse;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}

export { CarRequest, CarResponse };
