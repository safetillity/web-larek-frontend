import {
	ICard,
	IOrderData,
	TOrderFormData,
	ValidationErrors,
} from '../../types/index';
import { IEvents } from '../base/events';

export class AppData {
	basket: ICard[] = [];
	itemCatalog: ICard[] = [];
	order: IOrderData = {
		email: '',
		phone: '',
		payment: '',
		total: 0,
		address: '',
		items: [],
	};
	currentPreview: string | null = null;
	validationErrors: ValidationErrors = {};

	constructor(protected events: IEvents) {}

	notify(eventType: string, data?: object) {
		this.events.emit(eventType, data ?? {});
	}

	updateCatalog(products: ICard[]) {
		this.itemCatalog = [...this.itemCatalog, ...products];
		this.notify('catalog:updated', { catalog: this.itemCatalog });
	}

	setPreviewCard(card: ICard) {
		this.currentPreview = card.id;
		this.notify('preview:updated', card);
	}

	getActionLabel(card: ICard) {
		if (card.price !== null) {
			return this.isInCart(card) ? 'Добавить в корзину' : 'Убрать из корзины';
		}
		return 'Не для продажи';
	}

	toggleBasketItem(card: ICard) {
		this.isInCart(card) ? this.removeFromBasket(card) : this.addToCart(card);
	}

	addToCart(card: ICard) {
		this.basket = [...this.basket, card];
		this.notify('basket:changed');
	}

	removeFromBasket(card: ICard) {
		this.basket = this.basket.filter((item) => item.id !== card.id);
		this.notify('basket:changed');
	}

	getCardIndex(item: ICard) {
		return Number(this.basket.indexOf(item)) + 1;
	}

	isInCart(card: ICard): boolean {
		return this.basket.some((item) => item.id === card.id);
	}

	resetBasket() {
		this.basket = [];
		this.notify('basket:cleared');
	}

	resetOrder() {
		this.order = {
			total: 0,
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
		this.events.emit('basket:changed');
	}

	syncBasketWithOrder() {
		this.order.total = this.countBasketTotal();
		this.order.items = this.basket.map((item) => item.id);
	}

	countBasketTotal(): number {
		return this.basket.reduce(
			(sum, card) => sum + (Number(card.price) || 0),
			0
		);
	}

	updateOrderField(field: keyof TOrderFormData, value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: ValidationErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать почту';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}

		this.validationErrors = errors;
		this.notify('validationErrors:updated', this.validationErrors);

		return Object.keys(errors).length === 0;
	}
}
