import { IProduct, ICard } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';
export class Card implements ICard {
	protected element: HTMLElement;
	protected id: HTMLElement;
	protected title: HTMLElement;
	protected image: HTMLElement;
	protected categoty: HTMLElement;
	protected price: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.element = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this.categoty = this.element.querySelector('.cardcategory');
		this.title = this.element.querySelector('.cardtitle');
		this.image = this.element.querySelector('.cardimage');
		this.price = this.element.querySelector('.cardprice');
	}

	protected set setTitle(title: string) {}
	protected set setPrice(price: number | null) {}
	protected set setCategory(category: string) {}
	render(data: IProduct): HTMLElement {}
}
