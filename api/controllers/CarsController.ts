import { APIRequestContext } from "@playwright/test";

export default class CarsController {
    request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async removeCar(carId: number, sid: string) {
        const response = await this.request.delete(`/api/cars/${carId}`, {
            headers: {
                'Cookie': `${sid}`
            }
        });
        console.log(response.status());
        console.log(await response.json());
        return response;
    }

    async addCar(carData: { carBrandId: number; carModelId: number; mileage: number }, sid: string) {
        const response = await this.request.post('/api/cars', {
            data: carData,
            headers: {
                'Cookie': `${sid}`
            }
        });
        return response;
    }

    async getCars(sid: string) {
        const response = await this.request.get('/api/cars', {
            headers: {
                'Cookie': `${sid}`
            }
        });
        return response;
    }

    async removeLastAddedCar(sid: string) {
        const carsResponse = await this.getCars(sid);
        const carsBody = await carsResponse.json();
        const cars = carsBody.data;
        if (cars.length > 0) {
            await this.removeCar(cars[0].id, sid);
            console.log('Removed last added car:', cars[0].id);
        }
    }
}