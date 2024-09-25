import { IModal } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';
export class Modal implements IModal {
	protected _closeButton: HTMLButtonElement;
	content: HTMLElement;

	constructor(protected modalContainer: HTMLElement) {
		this._closeButton = modalContainer.querySelector(
			'.modal__close'
		) as HTMLButtonElement;
		this.content = modalContainer.querySelector(
			'.modal__content'
		) as HTMLElement;
		this._closeButton.addEventListener('click', this.close.bind(this));
	}

	close(): void {
	
	}

	open(): void {
	}
}
