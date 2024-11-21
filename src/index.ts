import './scss/styles.scss';
import { AppData } from './components/model/appData';
import { BasketItem, Card } from './components/view/card';
import { ApiModel } from './components/model/apiModel';
import { Page } from './components/view/page';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/view/basket';
import { Modal } from './components/view/modal';
import { ContactForm } from './components/view/forms/contactForm';
import { PaymentForm } from './components/view/forms/paymentForm';
import { Success } from './components/view/success';
import { ICard, IOrderData, API_URL, CDN_URL } from './types/index';
import { cloneTemplate, ensureElement } from './types/fns';

const templates = {
	itemCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
	cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
	cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
	basket: ensureElement<HTMLTemplateElement>('#basket'),
	payment: ensureElement<HTMLTemplateElement>('#order'),
	contacts: ensureElement<HTMLTemplateElement>('#contacts'),
	success: ensureElement<HTMLTemplateElement>('#success'),
	modal: ensureElement<HTMLElement>('#modal-container'),
};

const events = new EventEmitter();
const api = new ApiModel(CDN_URL, API_URL);
const appData = new AppData(events);
const modal = new Modal(templates.modal, events);
const page = new Page(document.body, events);
const basket = new Basket(cloneTemplate(templates.basket), events);
const paymentForm = new PaymentForm(cloneTemplate(templates.payment), events);
const contactForm = new ContactForm(cloneTemplate(templates.contacts), events);

api
	.fetchAllProducts()
	.then((products) => appData.updateCatalog(products))
	.catch(console.error);

events.on('catalog:updated', () => {
	page.catalog = appData.itemCatalog.map((item) =>
		new Card(cloneTemplate(templates.itemCatalog), {
			onClick: () => events.emit('card:selected', item),
		}).renderCard(item)
	);
	page.counter = appData.basket.length;
});

events.on('card:selected', (item: ICard) => appData.setPreviewCard(item));

events.on('preview:updated', (item: ICard) => {
	const card = new Card(cloneTemplate(templates.cardPreview), {
		onClick: () => {
			events.emit('card:basket', item);
			events.emit('preview:updated', item);
			modal.close();
		},
	});
	modal.render({
		content: card.renderCard({
			...item,
			button: appData.getActionLabel(item),
		}),
	});
});

events.on('card:basket', (item: ICard) => appData.toggleBasketItem(item));

events.on('basket:show', () => {
	modal.render({ content: basket.render() });
});

events.on('basket:changed', () => {
	basket.total = appData.countBasketTotal();
	page.counter = appData.basket.length;
	basket.items = appData.basket.map((basketItem) =>
		new BasketItem(cloneTemplate(templates.cardBasket), {
			onClick: () => appData.removeFromBasket(basketItem),
		}).renderCard({
			title: basketItem.title,
			price: basketItem.price,
		})
	);
});

events.on('order:open', () => {
	paymentForm.clearPaymentHighlight();
	modal.render({
		content: paymentForm.renderForm({ address: '', valid: false, errors: [] }),
	});
});

events.on(
	/^order\..*:changed/,
	({
		field,
		value,
	}: {
		field: keyof Pick<IOrderData, 'address' | 'phone' | 'email'>;
		value: string;
	}) => {
		appData.updateOrderField(field, value);
	}
);

events.on(
	'order:changed',
	({ payment, button }: { payment: string; button: HTMLElement }) => {
		paymentForm.highlightPaymentButton(button);
		appData.updateOrderField('payment', payment);
		appData.validateOrder();
	}
);

events.on('order:submit', () => {
	modal.render({
		content: contactForm.renderForm({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	appData.syncBasketWithOrder();

	if (appData.order.total <= 0) {
		console.error('Сумма заказа должна быть больше нуля');
		return;
	}

	api
		.placeOrder(appData.order)
		.then((result) => {
			const successWindow = new Success(cloneTemplate(templates.success), {
				onClick: () => {
					modal.close();
				},
			});
			appData.resetBasket();
			appData.resetOrder();

			modal.render({ content: successWindow.render({ total: result.total }) });
		})
		.catch((err) => {
			console.error(`Ошибка выполнения заказа ${err}`);
		});
});

events.on('validationErrors:updated', (errors: Partial<IOrderData>) => {
	const { email, phone, address, payment } = errors;
	contactForm.isValid = !email && !phone;
	contactForm.errorMessage = [email, phone].filter(Boolean).join('; ');
	paymentForm.isValid = !payment && !address;
	paymentForm.errorMessage = [payment, address].filter(Boolean).join('; ');
});

events.on('modal:opened', () => (page.locked = true));
events.on('modal:closed', () => (page.locked = false));
