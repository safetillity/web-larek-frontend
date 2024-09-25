import { IEvents } from '../base/events';
import { IOrderForm } from '../../types/index.ts';

export class Order implements IOrderForm {
	form: HTMLFormElement;
	choiceButtons: HTMLButtonElement[];
	sumbit: HTMLButtonElement;
	validationErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.form = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.buttonAll = Array.from(this.form.querySelectorAll('.button_alt'));
		this.buttonSubmit = this.form.querySelector('.order__button');
		this.validationErrors = this.form.querySelector('.form__errors');
	}

	set paymentSelection(paymentMethod: string) {}

	set valid(value: boolean) {}

	render(): HTMLElement {}
}
