import { IModal } from '../../types/index';
import { IEvents } from '../base/events';
import { Component } from '../base/component';
import { ensureElement } from '../../types/fns';

export class Modal extends Component<IModal> {
	protected closeButton: HTMLButtonElement;
	protected contentElement: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.contentElement = ensureElement<HTMLElement>(
			'.modal__content',
			container
		);

		this.attachEventListeners();
	}

	private attachEventListeners(): void {
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.contentElement.addEventListener('click', (event) =>
			event.stopPropagation()
		);
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
	}

	private handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Escape' || event.key === 'Esc') {
			this.close();
		}
	}

	set content(value: HTMLElement | null) {
		if (value === null) {
			this.contentElement.innerHTML = '';
		} else {
			this.contentElement.replaceChildren(value);
		}
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:opened');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:closed');
	}
	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
