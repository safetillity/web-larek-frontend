import { ISuccess, ISuccessActions } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement } from '../../types/fns';

export class Success extends Component<ISuccess> {
	protected closeButton: HTMLElement;
	protected messageElement: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);
		this.initializeElements();
		this.bindEventHandlers(actions);
	}

	private initializeElements(): void {
		this.closeButton = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this.messageElement = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
	}

	private bindEventHandlers(actions?: ISuccessActions): void {
		if (actions?.onClick) {
			this.closeButton.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this.messageElement.textContent = `Списано ${value} синапсов`;
	}
}
