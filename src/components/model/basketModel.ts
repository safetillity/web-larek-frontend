import { IBasketModel, IProduct } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';

export class BasketModel implements IBasketModel {
	protected _basketList: IProduct[];
	constructor() {
		this.basketList = [];
	}

	set basketList(value: IProduct[]) {}
	get basketList() {}

	countOrders(): number {}
	countSum(): number {}
	setOrder(order: IProduct): void {}
	deleteOrder(order: IProduct): void {}
	clearOrders(basketList: IProduct[]): void {}
}
