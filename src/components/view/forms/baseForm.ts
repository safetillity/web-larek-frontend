import { Component } from '../../base/component';
import { ensureElement } from '../../../types/fns';
import { IBaseForm } from '../../../types/index';
import { IEvents } from '../../base/events';

export class BaseForm<T> extends Component<IBaseForm> {
	protected submitButton: HTMLButtonElement;
	protected errorContainer: HTMLElement;

	constructor(
		protected formElement: HTMLFormElement,
		protected events: IEvents
	) {
		super(formElement);

		this.submitButton = ensureElement<HTMLButtonElement>(
			'button[type="submit"]',
			formElement
		);
		this.errorContainer = ensureElement<HTMLElement>(
			'.form__errors',
			formElement
		);

		this.container.addEventListener('input', (e: Event) => {
			const inputElement = e.target as HTMLInputElement;
			const fieldName = inputElement.name as keyof T;
			const fieldValue = inputElement.value;
			this.onFieldChange(fieldName, fieldValue);
		});

		this.container.addEventListener('submit', (submitEvent: Event) => {
			submitEvent.preventDefault();
			this.events.emit(`${this.formElement.name}:submit`);
		});
	}

	protected onFieldChange(field: keyof T, value: string) {
		this.events.emit(`order.${String(field)}:changed`, { field, value });
	}

	set isValid(isValid: boolean) {
		this.submitButton.disabled = !isValid;
	}

	set errorMessage(message: string) {
		this.updateText(this.errorContainer, message);
	}

	resetForm() {
		this.formElement.reset();
	}

	renderForm(state: Partial<T> & IBaseForm) {
		const { valid, errors, ...formFields } = state;
		super.render({ valid, errors });
		Object.assign(this, formFields);
		return this.formElement;
	}
}