import { IEvents } from '../base/events';
import { ISuccess } from '../../types/index.ts';
import { Component } from '../base/component.ts';

export class Success implements Component<ISuccess>{

	success: HTMLElement;
	description: HTMLElement;
	button: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, protected events: IEvents) {
		this.success = template.content
			.querySelector('.order-success')
			.cloneNode(true) as HTMLElement;
		this.description = this.success.querySelector(
			'.order-success__description'
		);
		this.button = this.success.querySelector('.order-success__close');
	}
	render(sum: number): HTMLElement {}
}
