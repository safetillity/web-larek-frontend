import { IBasket, ICard } from '../../types/index';
import { Component } from '../base/component';
import { EventEmitter } from '../base/events';
import { ensureElement, createElement } from '../../types/fns';

export class Basket extends Component<IBasket> {
	protected listEl: HTMLElement;
	protected totalPriceEl: HTMLElement;
	protected buttonEl: HTMLButtonElement;
	protected buttonDeleteEl: HTMLButtonElement;

	constructor(container: HTMLElement, private events: EventEmitter) {
		super(container);

		this.listEl = ensureElement<HTMLElement>('.basket__list', this.container);
		this.totalPriceEl = this.container.querySelector('.basket__price');
		this.buttonEl = this.container.querySelector('.basket__button');
		this.buttonDeleteEl = this.container.querySelector('.basket__item-delete');

		this.buttonEl?.addEventListener('click', () =>
			this.events.emit('order:open')
		);
		this.buttonDeleteEl?.addEventListener('click', () =>
			this.events.emit('item:toggle')
		);
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.listEl.replaceChildren(...items);
		} else {
			this.listEl.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);

			this.setDisabled(this.buttonEl, true);
		}
	}

	set selected(items: ICard[]) {
		this.setDisabled(this.buttonEl, items.length === 0);
	}

	set total(total: number | string) {
		this.totalPriceEl.textContent = `${total} синапсов`;
	}
}
