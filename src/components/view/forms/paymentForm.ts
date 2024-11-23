import { IEvents } from '../../base/events';
import { TOrderPayment } from '../../../types/index';
import { BaseForm } from './baseForm';
import { ensureElement } from '../../../types/fns';

export class PaymentForm extends BaseForm<TOrderPayment> {
	 addressInput: HTMLInputElement;
	cashButton: HTMLButtonElement;
	 onlineButton: HTMLButtonElement;

	constructor(formElement: HTMLFormElement, events: IEvents) {
		super(formElement, events);

		this.addressInput = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.formElement
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.formElement
		);
		this.onlineButton = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.formElement
		);

		if (this.onlineButton) {
			this.onlineButton.addEventListener('click', () => {
				events.emit('order:changed', {
					payment: this.onlineButton.name,
					button: this.onlineButton,
				});
			});
		}
		if (this.cashButton) {
			this.cashButton.addEventListener('click', () => {
				events.emit('order:changed', {
					payment: this.cashButton.name,
					button: this.cashButton,
				});
			});
		}
	}

	highlightPaymentButton(button: HTMLElement) {
		this.clearPaymentHighlight();
		this.updateClass(button, 'button_alt-active', true);
	}

	clearPaymentHighlight() {
		this.updateClass(this.cashButton, 'button_alt-active', false);
		this.updateClass(this.onlineButton, 'button_alt-active', false);
	}

	set address(value: string) {
		this.addressInput.value = value;
	}
}