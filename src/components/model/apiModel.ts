import { ICard, IOrderResults, IApiModel, IOrderData } from '../../types/index';
import { Api, ApiListResponse } from '../base/api';

export class ApiModel extends Api implements IApiModel {
	readonly cdn: string;

	constructor(
		cdn: string,
		serviceBaseUrl: string,
		requestOptions?: RequestInit
	) {
		super(serviceBaseUrl, requestOptions);
		this.cdn = cdn;
	}

	private makeApiCall<T>(
		endpoint: string,
		method: 'GET' | 'POST',
		payload?: any
	): Promise<T> {
		const options: RequestInit = {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: payload ? JSON.stringify(payload) : undefined,
		};

		return fetch(`${this.baseUrl}${endpoint}`, options).then((response) => {
			if (!response.ok) {
				throw new Error(
					`API call failed with status ${response.status}: ${response.statusText}`
				);
			}
			return response.json();
		});
	}

	async fetchProductDetails(productId: string): Promise<ICard> {
		const product = await this.makeApiCall<ICard>(
			`/product/${productId}`,
			'GET'
		);
		return {
			...product,
			image: `${this.cdn}${product.image}`,
		};
	}

	async fetchAllProducts(): Promise<ICard[]> {
		const response = await this.makeApiCall<ApiListResponse<ICard>>(
			`/product`,
			'GET'
		);
		return response.items.map((product) => ({
			...product,
			image: `${this.cdn}${product.image}`,
		}));
	}

	async placeOrder(orderData: IOrderData): Promise<IOrderResults> {
		return this.makeApiCall<IOrderResults>(`/order`, 'POST', orderData);
	}
}
