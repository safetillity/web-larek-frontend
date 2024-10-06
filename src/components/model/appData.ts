import { IAppData, IOrderData  , IBasketModel, ICard} from '../../types/index.ts';
import { IEvents } from '../base/events.ts';


export class appData implements IAppData {
	catalog: ICard[] = [];
	order: IOrderData = {
		payment: '',
		email: '',
		phone: '',
		address: '',
	}
	private basketModel: IBasketModel;

  setButtonStatus(item: ICard): boolean {}

  setCatalog(items: ICard[]) {}

	setOrder(address: string): string {}

	validateOrder(address: string): boolean {}

	setOrderContacts(contact: number | string): number | string {}

	validateOrderContacts(contact: number | string): boolean {}

	setPaymentSelection(payment: string): string {}

	validatePaymentSelection(payment: string): boolean {}

	clearOrderData(): void {}

}