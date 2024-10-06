import { IEvents } from '../base/events';
import { IOrderForm, IBaseForm } from '../../types/index.ts';

class BaseForm implements IBaseForm {
	form: HTMLFormElement;
	validationErrors: HTMLElement;
	submitButton: HTMLButtonElement;
	inputs: HTMLInputElement[] | HTMLInputElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.form = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.inputs = Array.from(this.form.querySelectorAll('.form__input'));
		this.submitButton = this.form.querySelector('.button') as HTMLButtonElement;
		this.validationErrors = this.form.querySelector(
			'.form__errors'
		) as HTMLElement;
	}

	render(): HTMLElement {}
}

export class OrderForm extends BaseForm implements IOrderForm {
	choiceButtons: HTMLButtonElement[];
	buttonSubmit: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events);
		this.choiceButtons = Array.from(
			this.form.querySelectorAll('.button_alt')
		) as HTMLButtonElement[];
		this.buttonSubmit = this.form.querySelector(
			'.order__button'
		) as HTMLButtonElement;
	}

	set paymentSelection(paymentMethod: string) {}

	render(): HTMLElement {}
}

export class ContactsForm extends BaseForm {
	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events);
	}

	render(): HTMLElement {}
}
