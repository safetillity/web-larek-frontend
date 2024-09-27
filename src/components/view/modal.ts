import { IModal } from '../../types/index.ts';
import { IEvents } from '../base/events.ts';
import { Component } from '../base/component.ts';
export class Modal extends Component<IModal> {
	protected _closeButton: HTMLButtonElement;
	content: HTMLElement;

	constructor( modalContainer: HTMLElement , container : HTMLElement, protected events: IEvents) {
		super(container)
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
