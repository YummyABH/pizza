import type { BaseOrder, BaseDelivery, MenuDishResponse } from "./api";

//#region orderStore.ts
export type OrderState = BaseOrder<BaseDelivery, MenuDishResponse>

export interface Price {
    to: number,
    from: number,
    price: number
}

export interface PriceList {
    city: 'Сухум' | 'Гагра'
    prices: Price[]
}

export interface OpenTime {
    closes_at: `${number}:${number}` | '--:--',
    opens_at: `${number}:${number}` | '--:--',
} 
//#endregion

//#region authStore.ts
export interface AuthData {
    password: string,
    username: string,
}
//#endregion