import { Brand } from "./brand.model"
import { Specification } from "./specification.model"

export class Car {
    id?: number
    url_slug?: string
    brand?: Brand
    model?: string
    year?: number
    description?: string
    price?: number
    image?: any
    specification?:Specification;

    constructor(car: Car) {
        this.id = car.id
        this.url_slug = car.url_slug
        this.brand = car.brand
        this.model = car.model
        this.year = car.year
        this.description = car.description
        this.price = car.price
        this.image = car.image
        this.specification = car.specification
    }
}
