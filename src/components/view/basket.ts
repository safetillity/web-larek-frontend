import { IProduct, IBasket } from '../../types/index.ts';
import { IEvents } from '../base/events';

export class Basket implements IBasket {
	sum: number;
	button: HTMLButtonElement;
	basket: HTMLElement;
	basketPrice: HTMLElement;
	basketList: HTMLElement;
	basketCounter: HTMLElement;
	title: HTMLElement;
	basketButton: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.basket = template.content
			.querySelector('.basket')
			.cloneNode(true) as HTMLElement;
		this.title = this.basket.querySelector('.modal__title');
		this.basketList = this.basket.querySelector('.basket__list');
		this.button = this.basket.querySelector('.basket__button');
		this.basketPrice = this.basket.querySelector('.basket__price');
		this.basketButton = document.querySelector('.header__basket');
		this.basketCounter = document.querySelector('.header__basket-counter');
		this.products = [];
	}

	set products(products: IProduct[]) {}

	render() {}

	renderSum(sum: number) {}

	renderBasketCounter(value: number) {}
}
