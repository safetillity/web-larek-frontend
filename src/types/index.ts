export interface IOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
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

export interface IFormModel {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
	validationErrors: object;

	setOrder(address: string): string;
	validateOrder(address: string): boolean;
	setOrderContact(contact: number | string): number | string;
	validateOrderContact(contact: number | string): boolean;
	setPaymentSelection(payment: string): string;
	validatePaymentSelection(payment: string): boolean;
}

export interface IOrder extends IOrderForm {
	items: string[];
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

export interface IOrderForm {
	form: HTMLFormElement;
	choiceButtons: HTMLButtonElement[];
	paymentSelection: string;
	validationErrors: HTMLElement;
	render(): HTMLElement;
}

export interface IContactsForm {
	form: HTMLFormElement;
	inputs: HTMLInputElement[];
	submitButton: HTMLButtonElement;
	formErrors: HTMLElement;
	render(): HTMLElement;
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
