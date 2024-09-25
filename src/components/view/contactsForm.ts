import { IEvents } from '../base/events';
import { IContactsForm } from '../../types/index.ts';

export class Contacts implements IContactsForm {
	form: HTMLFormElement;
	inputs: HTMLInputElement[];
	submitButton: HTMLButtonElement;
	validationErrors: HTMLElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.form = template.content
			.querySelector('.form')
			.cloneNode(true) as HTMLFormElement;
		this.inputs = Array.from(this.form.querySelectorAll('.form__input'));
		this.submitButton = this.form.querySelector('.button');
		this.validationErrors = this.form.querySelector('.form__errors');
	}

	set valid(value: boolean) {}

	render() {}
}
