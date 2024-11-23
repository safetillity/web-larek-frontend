import { ICardActions, ICard, categories } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement, formatNumber } from '../../types/fns';
import { AppData } from '../model/appData';

export class Card extends Component<ICard> {
	protected appData: AppData;
	protected titleElement: HTMLElement;
	protected priceLabel: HTMLSpanElement;
	protected imageElement: HTMLImageElement | null;
	protected actionButton: HTMLButtonElement | null;
	protected categoryLabel: HTMLSpanElement | null;
	protected descriptionElement: HTMLElement | null;
	protected indexElement: HTMLElement;
	protected removeButton: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		handlers?: ICardActions,
		appData?: AppData,
		isInBasket = false
	) {
		super(container);
		this.appData = appData;

		this.titleElement = ensureElement<HTMLElement>('.card__title', container);
		this.priceLabel = ensureElement<HTMLSpanElement>('.card__price', container);
		this.categoryLabel = container.querySelector('.card__category');
		this.actionButton = container.querySelector('.card__button');
		this.imageElement = container.querySelector('.card__image');
		this.descriptionElement = container.querySelector('.card__text');

		if (isInBasket) {
			this.indexElement = ensureElement<HTMLElement>(
				'.basket__item-index',
				container
			);
			this.removeButton = ensureElement<HTMLButtonElement>(
				'.basket__item-delete',
				container
			);
			this.bindRemoveButtonEvent(handlers);
		} else {
			this.bindEventHandlers(handlers);
		}
	}

	private bindEventHandlers(handlers?: ICardActions): void {
		if (handlers?.onClick) {
			const target = this.actionButton ?? this.container;
			target.addEventListener('click', handlers.onClick);
		}
	}

	private bindRemoveButtonEvent(handlers?: ICardActions): void {
		if (handlers?.onClick) {
			this.removeButton.addEventListener('click', handlers.onClick);
		}
	}

	isInBasket(): boolean {
		return this.appData.basket.some(
			(item) => item.id === this.container.dataset.id
		);
	}

	set button(text: string) {
		if (this.actionButton) {
			this.actionButton.textContent = text;
		}
	}

	updateActionLabel(card: ICard): string {
		if (card.price !== null) {
			return this.isInBasket() ? 'Уже в корзине' : 'В корзину';
		}
		return 'Бесценно';
	}

	set id(id: string) {
		this.container.dataset.id = id;
	}

	set title(title: string) {
		this.updateText(this.titleElement, title);
	}

	set description(description: string) {
		this.updateText(this.descriptionElement, description);
	}

	set price(price: number | null) {
		if (price !== null) {
			const formattedPrice =
				price <= 4 ? price.toString() : formatNumber(price);
			this.updateText(this.priceLabel, `${formattedPrice} синапсов`);
			this.setElementState(this.actionButton, this.isInBasket());
		} else {
			this.updateText(this.priceLabel, 'Бесценно');
			this.setElementState(this.actionButton, true);
		}
	}

	set image(src: string) {
		if (this.imageElement) {
			this.updateImage(this.imageElement, src, this.title);
		}
	}

	set category(category: string) {
		if (this.categoryLabel) {
			this.updateText(this.categoryLabel, category);
			const categoryClass = categories.get(category);
			if (categoryClass) {
				this.updateClass(this.categoryLabel, categoryClass, true);
			}
		}
	}

	set index(index: number) {
		if (this.indexElement) {
			this.updateText(this.indexElement, index.toString());
		}
	}
}
