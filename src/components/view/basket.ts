import { IBasket } from '../../types/index';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement, createElement } from '../../types/fns';

export class Basket extends Component<IBasket> {
	protected itemList: HTMLElement;
	protected totalAmount: HTMLElement;
	protected actionButton: HTMLElement;
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.itemList = ensureElement<HTMLElement>('.basket__list', this.container);
		this.totalAmount = this.container.querySelector('.basket__price');
		this.actionButton = this.container.querySelector('.basket__button');

		this.setupActionButton();
		this.clearBasket();
	}

	private setupActionButton(): void {
		this.actionButton.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.itemList.replaceChildren(...items);
			this.setElementState(this.actionButton, false);
		} else {
			this.displayEmptyMessage();
		}
	}

	private displayEmptyMessage(): void {
		this.setElementState(this.actionButton, true);
		this.itemList.replaceChildren(
			createElement('p', { textContent: 'Товары еще не добавлены в корзину' })
		);
	}

	public clearBasket(): void {
		this.items = [];
		this.displayEmptyMessage();
	}

	set total(total: number) {
		this.updateText(this.totalAmount, `${total} синапсов`);
	}
}
