export class Car {
    id: number
    url_slug: string
    brand: string
    model: string
    year: number
    description: string
    price: number
    photo: string

    constructor(car: Car) {
        this.id = car.id
        this.url_slug = car.url_slug
        this.brand = car.brand
        this.model = car.model
        this.year = car.year
        this.description = car.description
        this.price = car.price
        this.photo = car.photo
    }
}