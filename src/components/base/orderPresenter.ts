import { AppData } from '../model/appData';
import { PaymentForm } from '../view/forms/paymentForm';
export class OrderPresenter {
	constructor(private appData: AppData, private paymentForm: PaymentForm) {
		this.init();
	}

	init() {
		this.appData.events.on('order:changed', this.handleOrderChange.bind(this));
	}

  
	handleOrderChange({
		payment,
		button,
	}: {
		payment: string;
		button: HTMLElement;
	}) {
		this.appData.updateOrderField('payment', payment);
		this.paymentForm.highlightPaymentButton(button);
	}
}