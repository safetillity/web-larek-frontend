import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { IPage } from '../../types/index';
import { ensureElement } from '../../types/fns';
export class Page extends Component<IPage> {
	protected counterEl: HTMLElement;
	protected catalogEL: HTMLElement;
	protected wrapperEl: HTMLElement;
	protected basketEl: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.counterEl = ensureElement<HTMLElement>('.header__basket-counter');
		this.catalogEL = ensureElement<HTMLElement>('.gallery');
		this.wrapperEl = ensureElement<HTMLElement>('.page__wrapper');
		this.basketEl = ensureElement<HTMLElement>('.header__basket');

		this.basketEl.addEventListener('click', () => {
			this.events.emit('bucket:open');
		});
	}

	public set counter(value: number) {
		this.setText(this.counterEl, String(value));
	}

	public set catalog(items: HTMLElement[]) {
		this.catalogEL.replaceChildren(...items);
	}

	public set locked(value: boolean) {
		if (value) {
			this.wrapperEl.classList.add('page__wrapper_locked');
		} else {
			this.wrapperEl.classList.remove('page__wrapper_locked');
		}
	}
}
