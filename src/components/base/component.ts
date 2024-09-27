export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

  toggleClass(element: HTMLElement, className: string, state: boolean) {}
	

	protected setText(element: HTMLElement, value: string) {}

	protected setDisabled(element: HTMLElement, state: boolean) {}

	protected setHidden(element: HTMLElement) {}

	protected setVisible(element: HTMLElement) {}
	

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {}

	render(data?: Partial<T>): HTMLElement {}
}
