import { IEvents } from '../../base/events';
import { TOrderContacts } from '../../../types/index';
import { BaseForm } from './baseForm';

export class ContactForm extends BaseForm<TOrderContacts> {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	constructor(formElement: HTMLFormElement, events: IEvents) {
		super(formElement, events);

		this.emailInput = formElement.elements.namedItem(
			'email'
		) as HTMLInputElement;

		this.phoneInput = formElement.elements.namedItem(
			'phone'
		) as HTMLInputElement;
	}

	set email(value: string) {
		this.emailInput.value = value;
	}

	set phone(value: string) {
		this.phoneInput.value = value;
	}
}
