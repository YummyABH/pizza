import type { BaseOrder, BaseDelivery, MenuDishResponse } from "./api";

//#region orderStore.ts
export type OrderState = BaseOrder<BaseDelivery, MenuDishResponse>
//#endregion

//#region authStore.ts
export interface AuthData {
    password: string,
    username: string,
}
//#endregion