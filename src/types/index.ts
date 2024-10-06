export interface IOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IAppData {
	catalog: ICard[];
	order: IOrderData;
	basketModel: IBasketModel;

	setButtonStatus(item: ICard): boolean;
	setCatalog(items: ICard[]): void;	
	setOrder(address: string): string;
	validateOrder(address: string): boolean;
	setOrderContacts(contact: number | string): number | string;
	validateOrderContacts(contact: number | string): boolean;
	setPaymentSelection(payment: string): string;
	validatePaymentSelection(payment: string): boolean;
	clearOrderData(): void;
}
export interface IOrderResult {
	id: string;
	total: number;
}
export interface IBasketModel {
	basketList: IProduct[];
	countOrders(): number;
	countSum(): number;
	setOrder(order: IProduct): void;
	deleteOrder(order: IProduct): void;
	clearOrders(basketList: IProduct[]): void;
}

export interface IBaseForm {
	form: HTMLFormElement;
	validationErrors: HTMLElement;
	submitButton: HTMLButtonElement;
	inputs: HTMLInputElement[] | HTMLInputElement;
	render(): HTMLElement;
	valid: boolean;
}



export type validationErrors = Partial<Record<keyof IOrder, string>>;

export interface IBasket {
	products: IProduct[];
	sum: number;
	button: HTMLElement;
	basket: HTMLElement;
	basketPrice: HTMLElement;
	basketList: HTMLElement;
	basketCounter: HTMLElement;
	basketButton: HTMLElement;

	render();
	renderSum(sum: number);
	renderBasketCounter(value: number);
}

export interface IModal {
	close(): void;
	open(): void;
	content: HTMLElement;
}

export interface IProduct {
	id: number;
	desctiption: string;
	title: string;
	image: string;
	categoty: string;
	price: number | null;

	setTitle(element: HTMLElement, name: string);
	setPrice(element: HTMLElement, price: number);
	setCategory(element: HTMLElement, category: string);
	render(element: HTMLElement): HTMLElement;
}

export interface ICard {
	render(data: IProduct): HTMLElement;
}

export interface IForm {
	form: HTMLFormElement;
	validationErrors: HTMLElement;
	sumbitButton: HTMLButtonElement;
	inputs: HTMLInputElement | HTMLInputElement[];
	render(): HTMLElement;
}
export interface IOrderForm extends IForm {
	choiceButtons: HTMLButtonElement[];
	paymentSelection: string;
	render(): HTMLElement;
}



export interface IOrder extends IOrderForm {
	items: string[];
}



export interface ISuccess {
	success: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;
	render(sum: number): HTMLElement;
}

export interface ICardPreview {
	button: HTMLElement;
	render(data: IProduct): HTMLElement;
}
