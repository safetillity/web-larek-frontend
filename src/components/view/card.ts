import { IProduct, ICard } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';
export class Card implements ICard {
	protected _element: HTMLElement;
	protected _id: HTMLElement;
	protected _title: HTMLElement;
	protected _image: HTMLElement;
	protected _categoty: HTMLElement;
	protected _price: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this._element = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this._categoty = this._element.querySelector('.card__category');
		this._title = this._element.querySelector('.card__title');
		this._image = this._element.querySelector('.card__image');
		this._price = this._element.querySelector('.card__price');
	}

	protected set setTitle (_title : string) {}
	protected set setPrice(_price: number | null) {}
	protected set setCategory(_category: string) {}
	render(data: IProduct): HTMLElement {}
}
