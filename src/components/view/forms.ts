import { IEvents } from '../base/events';
import { IForm, TOrderContacts, TOrderPayment } from '../../types/index';
import { Component } from '../base/component';
import { ensureElement } from '../../types/fns';

export class Form<T> extends Component<IForm> {
	protected submitEl: HTMLButtonElement;
	protected errorsEl: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this.submitEl = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errorsEl = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	set valid(value: boolean) {
		this.submitEl.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.errorsEl, value);
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`order.${String(field)}:changed`, {
			field,
			value,
		});
	}

	clearValue() {
		this.container.reset();
	}

	render(state: Partial<T> & IForm) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
export class OrderForm extends Form<TOrderPayment> {
	protected addressEl: HTMLInputElement;
	protected buttonCashEl: HTMLButtonElement;
	protected buttonOnlineEL: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this.addressEl = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.container
		);
		this.buttonCashEl = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this.buttonOnlineEL = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);

		if (this.buttonOnlineEL) {
			this.buttonOnlineEL.addEventListener('click', () => {
				events.emit(`order:changed`, {
					payment: this.buttonOnlineEL.name,
					button: this.buttonOnlineEL,
				});
			});
		}

		if (this.buttonCashEl) {
			this.buttonCashEl.addEventListener('click', () => {
				events.emit(`order:changed`, {
					payment: this.buttonCashEl.name,
					button: this.buttonCashEl,
				});
			});
		}
	}

	set address(value: string) {
		this.addressEl.value = value;
	}

	togglePayment(value: HTMLElement) {
		this.clearPayment();
		this.toggleClass(value, 'button_alt-active', true);
	}

	clearPayment() {
		this.toggleClass(this.buttonCashEl, 'button_alt-active', false);
		this.toggleClass(this.buttonOnlineEL, 'button_alt-active', false);
	}
}

export class ContactsForm extends Form<TOrderContacts> {
	protected emailEl: HTMLInputElement;
	protected phoneEl: HTMLInputElement;
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this.emailEl = container.elements.namedItem('email') as HTMLInputElement;
		this.phoneEl = container.elements.namedItem('phone') as HTMLInputElement;
	}
	set email(value: string) {
		this.emailEl.value = value;
	}
	set phone(value: string) {
		this.phoneEl.value = value;
	}
}
