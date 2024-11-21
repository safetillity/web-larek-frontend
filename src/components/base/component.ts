export abstract class Component<T> {
	constructor(protected readonly container: HTMLElement) {}

	updateClass(element: HTMLElement, className: string, add: boolean) {
		if (add) {
			element.classList.add(className);
		} else {
			element.classList.remove(className);
		}
	}

	updateText(target: HTMLElement, content: unknown): void {
		if (target) {
			target.textContent = String(content);
		}
	}

	setElementState(target: HTMLElement, isDisabled: boolean): void {
		if (target) {
			isDisabled
				? target.setAttribute('disabled', 'true')
				: target.removeAttribute('disabled');
		}
	}

	hideElement(target: HTMLElement): void {
		target.style.display = 'none';
	}

	showElement(target: HTMLElement): void {
		target.style.display = '';
	}

	updateImage(
		imageElement: HTMLImageElement,
		source: string,
		alternativeText?: string
	): void {
		if (imageElement) {
			imageElement.src = source;
			if (alternativeText) {
				imageElement.alt = alternativeText;
			}
		}
	}

	render(properties?: Partial<T>): HTMLElement {
		if (properties) {
			Object.assign(this, properties);
		}
		return this.container;
	}
}
