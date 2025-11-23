//#region Base types
export interface BaseOrder<VDelivery, TDish> {
  name: string,
  phone: string,
  delivery: VDelivery,
  dishes: TDish[],
  cutlery_status: boolean,
  cutlery_quantity: number,
  order_comment: string,
}

export interface BaseDish {
  id: number,
  quantity: number,
  size: string,
}

export interface BaseDelivery {
  status: boolean,
  address: string,
  comment: string,
}
//#endregion

//#region apiGetDish.ts
export interface DishCharacteristics {
    size: string
    price: string
    measure: string
    quantity: string
  }

export interface MenuDishResponse {
    id: number
    name: string
    categoryName: string
    description: string
    dish_status: boolean
    composition: string[]
    quantity: number
    image: string
    categoryId: number
    default_characteristics: number
    characteristics: DishCharacteristics[]
  }

export interface MenuCategory {
    categoryId: number
    category_name: string
    dishes: MenuDishResponse[]
  }

export interface CategoryDishes {
  id: number,
  name: string
}
//#endregion

//#region apiOrder.ts
export interface OrderDishResponse extends BaseDish {
  price: number,
  image: string,
  name: string
}

export type OrderDishRequest = BaseDish

export interface OrderDeliveryResponse extends BaseDelivery {
  delivery_price: number
}

export type OrderDeliveryRequest = BaseDelivery

export interface CreateOrderResponse extends BaseOrder<OrderDeliveryResponse, OrderDishResponse> {
  created_at: string,
  id: number,
  secret_key: string,
  status: boolean,
  total_price: number
}

export type CreateOrderRequest = BaseOrder<OrderDeliveryRequest, OrderDishRequest>

//#endregion