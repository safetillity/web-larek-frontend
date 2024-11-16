import { ICard, IOrderResults, IApi, IOrderData } from '../../types/index';
import { Api, ApiListResponse } from '../base/api';

export class ApiModel extends Api implements IApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductItem(id: string): Promise<ICard> {
		return this.get(`/product/${id}`).then((item: ICard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<ICard[]> {
		return this.get(`/product`).then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderItems(order: IOrderData): Promise<IOrderResults> {
		return this.post(`/order`, order).then((data: IOrderResults) => data);
	}
}
