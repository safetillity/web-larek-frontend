import {
	IAppData,
	ICard,
	IOrderData,
	TOrderFormData,
	ValidationErrors,
} from '../../types/index';
import { IEvents } from '../base/events';

export class AppData implements IAppData {
	basket: ICard[] = [];
	catalog: ICard[] = [];
	order: IOrderData = {
		email: '',
		phone: '',
		payment: '',
		sum: 0,
		address: '',
		items: [],
	};
	preview: string | null = null;
	formErrors: ValidationErrors = {};
	events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setCatalog(items: ICard[]) {
		this.catalog = [...items];
		this.events.emit('catalog:updated', { catalog: this.catalog });
	}

	setPreview(item: ICard) {
		this.preview = item.id;
		this.events.emit('preview:updated', item);
	}

	getButtonStatus(item: ICard) {
		if (item.price === null) {
			return 'Не для продажи';
		}
		if (!this.basket.some((card) => card.id === item.id)) {
			return 'Добавить в корзину';
		} else {
			return 'Убрать из корзины';
		}
	}

	toggleBasketCard(item: ICard) {
		if (!this.basket.some((card) => card.id === item.id)) {
			this.addCardToBasket(item);
		} else {
			this.deleteCardFromBasket(item);
		}
	}

	addCardToBasket(item: ICard) {
		this.basket = [...this.basket, item];
		this.events.emit('basket:updated', { basket: this.basket });
	}

	deleteCardFromBasket(item: ICard) {
		this.basket = this.basket.filter((card) => card.id !== item.id);
		this.events.emit('basket:updated', { basket: this.basket });
	}

	getCardIndex(item: ICard) {
		return this.basket.indexOf(item) + 1;
	}

	clearBasket() {
		this.basket = [];
		this.events.emit('basket:cleared');
	}

	clearOrder() {
		this.order = {
			sum: 0,
			items: [],
			email: '',
			phone: '',
			address: '',
			payment: '',
		};
		this.events.emit('order:cleared');
	}

	setBasketToOrder() {
		this.order.items = this.basket.map((card) => card.id);
		this.order.sum = this.getBasketTotal();
		this.events.emit('order:updated', { order: this.order });
	}

	getBasketTotal() {
		return this.basket.reduce((total, product) => total + product.price, 0);
	}

	setOrderPayment(value: string) {
		this.order.payment = value;
		this.emitOrderChanges();
	}

	setOrderAddress(value: string) {
		this.order.address = value;
		this.emitOrderChanges();
	}

	setOrderPhone(value: string) {
		this.order.phone = value;
		this.emitOrderChanges();
	}

	setOrderEmail(value: string) {
		this.order.email = value;
		this.emitOrderChanges();
	}

	setOrderField(field: keyof TOrderFormData, value: string) {
		this.order[field] = value;
		this.validateOrder();
		this.emitOrderChanges();
	}

	private emitOrderChanges() {
		this.events.emit('order:updated', { order: this.order });
	}

	validateOrder() {
		const errors: ValidationErrors = {};

		if (!this.order.email) {
			errors.email = `Необходимо указать почту`;
		}
		if (!this.order.phone) {
			errors.phone = `Необходимо указать номер телефона`;
		}
		if (!this.order.address) {
			errors.address = `Необходимо указать адрес`;
		}
		if (!this.order.payment) {
			errors.payment = `Необходимо указать способ оплаты`;
		}

		this.formErrors = errors;
		this.events.emit('formErrors:updated', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
