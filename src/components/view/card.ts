import { ICardActions, ICard, categories } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement, formatNumber } from '../../types/fns';

export class Card extends Component<ICard> {
	protected titleEl: HTMLElement;
	protected imageEl: HTMLImageElement;
	protected buttonEl: HTMLButtonElement;
	protected categoryEl: HTMLSpanElement;
	protected priceEl: HTMLSpanElement;
	protected descriptionEl: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this.titleEl = ensureElement<HTMLElement>(`.card__title`, container);
		this.priceEl = ensureElement<HTMLSpanElement>(`.card__price`, container);
		this.categoryEl = container.querySelector(`.card__category`);
		this.buttonEl = container.querySelector(`.card__button`);
		this.imageEl = container.querySelector(`.card__image`);
		this.descriptionEl = container.querySelector(`.card__text`);

		if (actions?.onClick) {
			if (this.buttonEl) {
				this.buttonEl.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this.titleEl, value);
	}

	get title(): string {
		return this.titleEl.textContent || '';
	}

	set description(value: string) {
		this.setText(this.descriptionEl, value);
	}

	get description(): string {
		return this.descriptionEl.textContent || '';
	}

	set price(value: string) {
		if (value) {
			this.setText(
				this.priceEl,
				`${
					value.toString().length <= 4 ? value : formatNumber(Number(value))
				} синапсов`
			);
		} else {
			this.setText(this.priceEl, `Бесценно`);
			this.setDisabled(this.buttonEl, true);
		}
	}

	get price(): string {
		return this.priceEl.textContent;
	}

	set image(value: string) {
		this.setImage(this.imageEl, value, this.title);
	}

	set category(value: string) {
		this.setText(this.categoryEl, value);
		this.toggleClass(this.categoryEl, categories.get(value), true);
	}

	get category(): string {
		return this.categoryEl.textContent || '';
	}

	set button(value: string) {
		this.buttonEl.textContent = value;
	}
}

export class BasketCard extends Card {
	protected indexEl: HTMLElement;
	protected deleteButtonEl: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this.indexEl = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this.titleEl = ensureElement<HTMLElement>(`.card__title`, container);
		this.priceEl = ensureElement<HTMLElement>(`.card__price`, container);
		this.deleteButtonEl = ensureElement<HTMLButtonElement>(
			`.basket__item-delete`,
			container
		);
		if (actions && actions.onClick) {
			this.deleteButtonEl.addEventListener('click', actions.onClick);
		}
	}

	set index(value: number) {
		this.setText(this.indexEl, value);
	}
}
