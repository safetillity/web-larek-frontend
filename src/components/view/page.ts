import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { IPage } from '../../types/index';
import { ensureElement } from '../../types/fns';
export class Page extends Component<IPage> {
	protected basketCounterElement: HTMLElement;
	protected galleryElement: HTMLElement;
	protected mainWrapper: HTMLElement;
	protected headerBasketElement: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.basketCounterElement = ensureElement<HTMLElement>(
			'.header__basket-counter'
		);
		this.galleryElement = ensureElement<HTMLElement>('.gallery');
		this.mainWrapper = ensureElement<HTMLElement>('.page__wrapper');
		this.headerBasketElement = ensureElement<HTMLElement>('.header__basket');

		this.headerBasketElement.addEventListener('click', () => {
			this.events.emit('basket:show');
		});

		this.initEventListeners();
	}
	private initEventListeners(): void {
		this.headerBasketElement.addEventListener(
			'click',
			this.handleBasketClick.bind(this)
		);
	}

	private handleBasketClick(): void {
		this.events.emit('basket:show');
	}

	public set counter(value: number) {
		this.updateText(this.basketCounterElement, String(value));
	}

	public set catalog(items: HTMLElement[]) {
		this.galleryElement.replaceChildren(...items);
	}

	public set locked(value: boolean) {
		this.mainWrapper.classList.toggle('page__wrapper_locked', value);
	}
}
