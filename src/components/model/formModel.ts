import { IFormModel, IOrder, validationErrors } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';
export class FormModel implements IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	validationErrors: validationErrors = {}
	

	constructor(protected events: IEvents) {
		this.payment = '';
		this.email = '';
		this.phone = '';
		this.address = '';
		this.total = 0;
		this.items = [];
	}
	setOrder(address: string): string {}

	validateOrder(address: string): boolean {}

	setOrderContact(contact: number | string): number | string {}

	validateOrderContact(contact: number | string): boolean {}

	setPaymentSelection(payment: string): string {}

	validatePaymentSelection(payment: string): boolean {}
}
