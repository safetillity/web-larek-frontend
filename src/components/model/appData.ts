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
		address: '',
	};
	currentPreview: string | null = null;
	validationErrors: ValidationErrors = {};

	constructor(protected events: IEvents) {}

	createOrderPayload(): IOrderData & { total: number; items: string[] } {
		return {
			...this.order,
			total: this.countBasketTotal(),
			items: this.countBasketItems(),
		};
	}

	notify(eventType: string, data?: object) {
		this.events.emit(eventType, data ?? {});
	}

	updateCatalog(products: ICard[]) {
		this.itemCatalog = [...products];
		this.notify('catalog:updated', { catalog: this.itemCatalog });
	}

	setPreviewCard(card: ICard) {
		this.currentPreview = card.id;
		this.notify('preview:updated', card);
	}

	toggleBasketItem(card: ICard) {
		this.isInBasket(card)
			? this.removeFromBasket(card)
			: this.addToBasket(card);
	}

	addToBasket(card: ICard) {
		this.basket = [...this.basket, card];
		this.notify('basket:changed', {
			basketItems: this.basket,
			total: this.countBasketTotal(),
		});
	}

	removeFromBasket(card: ICard) {
		this.basket = this.basket.filter((item) => item.id !== card.id);
		this.notify('basket:changed', {
			basketItems: this.basket,
			total: this.countBasketTotal(),
		});
	}

	resetBasket() {
		this.basket = [];
		this.notify('basket:changed', {
			basketItems: this.basket,
			total: 0,
		});
	}

	getCardIndex(item: ICard) {
		return Number(this.basket.indexOf(item)) + 1;
	}

	isInBasket(card: ICard): boolean {
		return this.basket.some((item) => item.id === card.id);
	}

	resetOrder() {
		this.order = {
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
		this.events.emit('basket:changed');
		this.validateOrder();
	}

	countBasketTotal(): number {
		const total = this.basket.reduce((sum, card) => {
			return sum + (Number(card.price) || 0);
		}, 0);
		return total;
	}

	countBasketItems(): string[] {
		return this.basket.map((item) => item.id);
	}

	updateOrderField(field: keyof TOrderFormData, value: string) {
		this.order[field] = value;
		this.notify('order:updated', { field, value });
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
