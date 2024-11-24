import './scss/styles.scss';
import { AppData } from './components/model/appData';
import { Card } from './components/view/card';
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
import { OrderPresenter } from './components/base/orderPresenter';

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
const paymentForm = new PaymentForm(cloneTemplate(templates.payment), events );
const contactForm = new ContactForm(cloneTemplate(templates.contacts), events);
const orderPresenter = new OrderPresenter(appData, paymentForm);
const successWindow = new Success(cloneTemplate(templates.success), {
	onClick: () => {
		modal.close();
	},
});

api
	.fetchAllProducts()
	.then((products) => {
		appData.updateCatalog(products);
		events.emit('catalog:updated');
	})
	.catch(console.error);

events.on('card:selected', (item: ICard) => {
	appData.setPreviewCard(item);
});

events.on('preview:updated', (item: ICard) => {
	const card = new Card(
		cloneTemplate(templates.cardPreview),
		{
			onClick: () => {
				events.emit('card:basket', item);
				modal.close();
			},
		},
		appData
	);
	modal.render({
		content: card.render({
			...item,
			button: card.updateActionLabel(item),
		}),
	});
});

events.on('card:basket', (item: ICard) => {
	appData.toggleBasketItem(item);
	events.emit('basket:changed');
});

events.on('basket:show', () => {
	modal.render({ content: basket.render() });
});

events.on('basket:changed', () => {
	basket.total = appData.countBasketTotal();
	page.counter = appData.basket.length;
	basket.items = appData.basket.map((basketItem) =>
		new Card(
			cloneTemplate(templates.cardBasket),
			{
				onClick: () => {
					appData.removeFromBasket(basketItem);
					events.emit('basket:changed');
				},
			},
			appData,
			true
		).render({
			title: basketItem.title,
			price: basketItem.price,
			index: appData.getCardIndex(basketItem),
		})
	);
});

events.on('order:open', () => {
	appData.validateOrder();
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
		orderPresenter.handleOrderChange({ payment, button });
		appData.updateOrderField('payment', payment);
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
	api.placeOrder(appData.createOrderPayload()).then((result) => {
		appData.resetOrder();
		appData.resetBasket();
		page.counter = appData.countBasketItems().length;
		modal.render({ content: successWindow.render({ total: result.total }) });
	});
});

events.on('catalog:updated', () => {
	page.catalog = appData.itemCatalog.map((item) => {
		const card = new Card(
			cloneTemplate(templates.itemCatalog),
			{
				onClick: () => events.emit('card:selected', item),
			},
			appData
		);
		return card.render({
			...item,
			button: card.updateActionLabel(item),
		});
	});
	page.counter = appData.basket.length;
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
