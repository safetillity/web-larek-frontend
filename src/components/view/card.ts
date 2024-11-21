import { ICardActions, ICard, categories } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement, formatNumber } from '../../types/fns';

export class Card extends Component<ICard> {
	protected titleElement: HTMLElement;
	protected imageElement: HTMLImageElement | null;
	protected actionButton: HTMLButtonElement | null;
	protected categoryLabel: HTMLSpanElement | null;
	protected priceLabel: HTMLSpanElement;
	protected descriptionElement: HTMLElement | null;

	constructor(container: HTMLElement, handlers?: ICardActions) {
		super(container);
		this.initializeElements(container);
		this.bindEventHandlers(handlers);
	}

	private initializeElements(container: HTMLElement): void {
		this.titleElement = ensureElement<HTMLElement>('.card__title', container);
		this.priceLabel = ensureElement<HTMLSpanElement>('.card__price', container);
		this.categoryLabel =
			container.querySelector<HTMLSpanElement>('.card__category');
		this.actionButton =
			container.querySelector<HTMLButtonElement>('.card__button');
		this.imageElement =
			container.querySelector<HTMLImageElement>('.card__image');
		this.descriptionElement = container.querySelector('.card__text');
	}

	private bindEventHandlers(handlers?: ICardActions): void {
		if (handlers?.onClick) {
			const target = this.actionButton ?? this.container;
			target.addEventListener('click', handlers.onClick);
		}
	}

	set productId(id: string) {
		this.container.dataset.id = id;
	}

	get productId(): string {
		return this.container.dataset.id || '';
	}

	set productTitle(title: string) {
		this.updateText(this.titleElement, title);
	}

	get productTitle(): string {
		return this.titleElement.textContent || '';
	}

	set productDescription(description: string) {
		this.updateText(this.descriptionElement, description);
	}

	get productDescription(): string {
		return this.descriptionElement?.textContent || '';
	}

	set productPrice(price: number | null) {
		if (price !== null) {
			const formattedPrice =
				price <= 4 ? price.toString() : formatNumber(price);
			this.updateText(this.priceLabel, `${formattedPrice} синапсов`);
			this.toggleButtonState(false);
		} else {
			this.updateText(this.priceLabel, 'Бесценно');
			this.toggleButtonState(true);
		}
	}

	get productPrice(): string {
		return this.priceLabel.textContent || '';
	}

	set productImage(src: string) {
		if (this.imageElement) {
			this.updateImage(this.imageElement, src, this.productTitle);
		}
	}

	set productCategory(category: string) {
		if (this.categoryLabel) {
			this.updateText(this.categoryLabel, category);
			const categoryClass = categories.get(category);
			if (categoryClass) {
				this.updateClass(this.categoryLabel, categoryClass, true);
			}
		}
	}

	get productCategory(): string {
		return this.categoryLabel?.textContent || '';
	}

	set actionButtonText(text: string) {
		if (this.actionButton) {
			this.actionButton.textContent = text;
		}
	}

	protected toggleButtonState(disable: boolean): void {
		if (this.actionButton) {
			this.setElementState(this.actionButton, disable);
		}
	}

	renderCard(properties?: Partial<ICard>): HTMLElement {
		super.render(properties);
		if (properties) {
			this.productId = properties.id;
			this.productTitle = properties.title;
			this.productDescription = properties.description;
			this.productImage = properties.image;
			this.productPrice = properties.price;
			this.productCategory = properties.category;
		}
		return this.container;
	}
}

export class BasketItem extends Card {
	protected indexElement: HTMLElement;
	protected removeButton: HTMLButtonElement;

	constructor(container: HTMLElement, handlers?: ICardActions) {
		super(container, handlers);
		this.indexElement = ensureElement<HTMLElement>(
			'.basket__item-index',
			container
		);
		this.removeButton = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			container
		);
		this.bindRemoveButtonEvent(handlers);
	}

	private bindRemoveButtonEvent(handlers?: ICardActions): void {
		if (handlers?.onClick) {
			this.removeButton.addEventListener('click', handlers.onClick);
		}
	}

	set itemIndex(index: number) {
		this.updateText(this.indexElement, index.toString());
	}
}
