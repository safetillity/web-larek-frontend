export interface IApiModel {
	fetchProductDetails: (id: string) => Promise<ICard>;
	fetchAllProducts: () => Promise<ICard[]>;
	placeOrder: (order: IOrderData) => Promise<IOrderResults>;
}

export interface IOrderData {
	total: number;
	payment: string;
	email: string;
	phone: string;
	address: string;
	items: string[];
}

export interface IOrderResults {
	id: string;
	total: number;
}

export class IBasket {
	items: ICard[] = [];
	total: number | null;
	isEmpty: boolean;
}

export interface IModal {
	content: HTMLElement;
}

export interface ICard {
	id: string;
	title: string;
	description: string;
	price: number | null;
	image: string;
	category: string;
	button: string;
}

export interface IBaseForm {
	valid: boolean;
	errors: string[];
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface ISuccess {
	total: number;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccessActions {
	onClick: () => void;
}

export const categories = new Map<string, string>([
	['софт-скилл', 'card__category_soft'],
	['хард-скилл', 'card__category_hard'],
	['другое', 'card__category_other'],
	['дополнительное', 'card__category_additional'],
	['кнопка', 'card__category_button'],
]);

export type TOrderChoice = 'онлайн' | '' | 'при получении';
export type TOrderPayment = Pick<IOrderData, 'payment' | 'address'>;
export type TOrderContacts = Pick<IOrderData, 'email' | 'phone'>;
export type TOrderFormData = TOrderContacts & TOrderPayment;
export type ValidationErrors = Partial<Record<keyof IOrderData, string>>;

export const API_URL = `https://larek-api.nomoreparties.co/api/weblarek`;
export const CDN_URL = `https://larek-api.nomoreparties.co/content/weblarek`;

export const settings = {};
