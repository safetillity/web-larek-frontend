import { IProduct , IOrderData, IOrderResult } from '../../types/index.ts';
import { Api , ApiListResponse} from '../base/api';


export class ApiModel extends Api {
	cdn: string;
	items: IProduct[];

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getListProductCard(): Promise<IProduct[]> {}

	postOrderLot(data: IOrderData): Promise<IOrderResult> {}
}