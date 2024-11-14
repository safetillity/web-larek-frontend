import { IModal } from '../../types/index';
import { IEvents } from '../base/events';
import { Component } from '../base/component';
import { ensureElement } from '../../types/fns';

export class Modal extends Component<IModal> {
	protected closeButtonEl: HTMLButtonElement;
	protected contentEl: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButtonEl = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.contentEl = ensureElement<HTMLElement>('.modal__content', container);

		this.closeButtonEl.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this.contentEl.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	set content(value: HTMLElement) {
		this.contentEl.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.contentEl = null;
		this.events.emit('modal:close');
	}

	render(data: IModal): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
