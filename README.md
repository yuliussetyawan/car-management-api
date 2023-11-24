# Flow endpoint

**4 layers:**
1. Router: done
2. Handler: done
3. Service (Usecase): done
4. Repository (Save/Get to/from the Database): done

---

## Migration

1. Create a migration for the "cars" table:

   npx knex migrate:make create_cars_table


2. Run the migration:

   npx knex migrate:up



![DB](db.png)


## Endpoints

1. **Get all cars:**
   - http://localhost:3001/api/cars
   ![GET ALL](preview/get_all.PNG)

2. **Get car by id:**
   - http://localhost:3001/api/cars/:id
   ![GET ID](preview/get_by_id.PNG)

3. **Get car by size category:**
   - http://localhost:3001/api/category/:size
   ![GET CATEGORY](preview/get_by_category.PNG)

4. **Upload car (POST):**
   - http://localhost:3001/api/cars
   - **Body Parameters:**
     - car_name (string)
     - car_size (string)
     - car_rent_price (int)
     - car_photo (file)
   -![UPLOAD CAR](preview/post.PNG)

5. **Update car by id (PATCH):**
   - http://localhost:3001/api/cars/:id
   - **Body Parameters:**
     - car_name (string)
     - car_size (string)
     - car_rent_price (int)
     - car_photo (file)
   - ![PATCH CAR](preview/patch.PNG)

6. **Delete car by id (DELETE):**
   - http://localhost:3001/api/cars/:id
   ![PATCH CAR](preview/delete.PNG)


## PGADMIN

![PGADMIN](preview/pg_admin.PNG)