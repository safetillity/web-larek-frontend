import { ISuccess, ISuccessActions } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement } from '../../types/fns';

export class Success extends Component<ISuccess> {
	protected closeEl: HTMLElement;
	protected descriptionEl: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this.closeEl = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this.descriptionEl = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this.closeEl.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) {
		this.descriptionEl.textContent = `Списано ${value} синапсов`;
	}
}
