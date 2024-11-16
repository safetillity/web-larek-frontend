import { IBasket } from '../../types/index';
import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement, createElement } from '../../types/fns';

export class Basket extends Component<IBasket> {
	protected listEl: HTMLElement;
	protected sumEl: HTMLElement;
	protected buttonEl: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.listEl = ensureElement<HTMLElement>('.basket__list', this.container);
		this.sumEl = this.container.querySelector('.basket__price');
		this.buttonEl = this.container.querySelector('.basket__button');

		if (this.buttonEl) {
			this.buttonEl.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.listEl.replaceChildren(...items);
			this.setDisabled(this.buttonEl, false);
		} else {
			this.listEl.replaceChildren(
				createElement('p', { textContent: 'Товары еще не добавлены в корзину' })
			);
			this.setDisabled(this.buttonEl, true);
		}
	}

	set total(total: number) {
		this.setText(this.sumEl, `${total} синапсов`);
	}
}
