import { Cart } from "./Cart"

export class OrderDetails {
    id!: number
    userId!: any
    subTotal!: number
    cartItemsList!: Cart[]
}