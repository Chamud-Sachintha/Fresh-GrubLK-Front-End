import { Cart } from "./Cart"

export class OrderDetails {
    id!: number
    userId!: any
    subTotal!: number
    orderStatus!: string
    cartItemsList!: Cart[]
    restuarantId!: string
}