import { BaseForm } from './baseForm';
import { IEvents } from '../../base/events';
import { TOrderPayment } from '../../../types/index';
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

		this.initPaymentButtons();
	}

	private initPaymentButtons() {
		const paymentButtons = [this.cashButton, this.onlineButton];
		paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.events.emit('order:paymentChanged', { payment: button.name });
			});
		});
	}

	highlightPaymentButton(button: HTMLElement) {
		this.clearPaymentHighlight();
		button.classList.add('button_alt-active');
	}

	setPaymentState(payment: string) {
		this.clearPaymentHighlight();
		const button = payment === 'cash' ? this.cashButton : this.onlineButton;
		if (button) button.classList.add('button_alt-active');
	}

	updatePaymentButtons(payment: string) {
		this.clearPaymentHighlight();
		if (!payment) return;
		const paymentButton =
			payment === 'cash' ? this.cashButton : this.onlineButton;
		paymentButton.classList.add('button_alt-active');
	}

	clearPaymentHighlight() {
		[this.cashButton, this.onlineButton].forEach((btn) =>
			btn.classList.remove('button_alt-active')
		);
	}

	set address(value: string) {
		this.addressInput.value = value;
	}
}
