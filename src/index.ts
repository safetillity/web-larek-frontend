import './scss/styles.scss';
import { AppData } from './components/model/appData';
import { BasketCard, Card } from './components/view/card';
import { ApiModel } from './components/model/apiModel';
import { Page } from './components/view/page';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/view/basket';
import { Modal } from './components/view/modal';
import { OrderForm, ContactsForm } from './components/view/forms';
import { Success } from './components/view/success';
import { ICard, IOrderData, API_URL, CDN_URL } from './types/index';
import { cloneTemplate, ensureElement } from './types/fns';

const events = new EventEmitter();
const api = new ApiModel(CDN_URL, API_URL);

// Модель данных приложения
const appData = new AppData(events);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentTemplate = ensureElement<HTMLTemplateElement>('#order');
const contacsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Глобальные контейнеры
const modalWindow = ensureElement<HTMLElement>('#modal-container');
const pageBody = document.body;

const page = new Page(pageBody, events);
const modal = new Modal(modalWindow, events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(paymentTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contacsTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Инициализация каталога
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

// Инициализация или изменение элементов в каталоге
events.on('cards:changed', () => {
	page.counter = appData.basket.length;
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:selected', item);
			},
		});
		return card.render(item);
	});
});

// Выбор карточки как элемент превью
events.on('card:selected', (item: ICard) => {
	appData.setPreview(item);
});

// Изменение превью
events.on('preview:changed', (item: ICard) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:basket', item);
			events.emit('preview:changed', item);
			modal.close();
		},
	});
	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
			button: appData.getButtonStatus(item),
		}),
	});
});

// // Отправка карточки в корзину
events.on('card:basket', (item: ICard) => {
	appData.toggleBasketCard(item);
});

// Открытие корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// // Изменение данных корзины
events.on('basket:changed', () => {
	page.counter = appData.basket.length;
	basket.total = appData.getBasketTotal();
	basket.items = appData.basket.map((basketCard) => {
		const newBasketCard = new BasketCard(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				appData.deleteCardFromBasket(basketCard);
			},
		});
		newBasketCard.index = appData.getCardIndex(basketCard);
		return newBasketCard.render({
			title: basketCard.title,
			price: basketCard.price,
		});
	});
});

// Открытие формы заказа
events.on('order:open', () => {
	orderForm.clearPayment();
	modal.render({
		content: orderForm.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей
events.on(
	/^order\..*:changed/,
	(data: {
		field: keyof Pick<IOrderData, 'address' | 'phone' | 'email'>;
		value: string;
	}) => {
		appData.setOrderField(data.field, data.value);
	}
);

// // Изменения в заказе
events.on('order:changed', (data: { payment: string; button: HTMLElement }) => {
	orderForm.togglePayment(data.button);
	appData.setOrderPayment(data.payment);
	appData.validateOrder();
});

// // Подтверджение формы оплаты
events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

// Подтверджение формы контактов
events.on('contacts:submit', () => {
	appData.setBasketToOrder();
	api
		.orderItems(appData.order)
		.then((result) => {
			console.log(appData.basket, appData.order);
			const successWindow = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			appData.clearBasket();
			appData.clearOrder();

			modal.render({ content: successWindow.render({ total: result.total }) });
		})
		.catch((err) => {
			console.error(`Ошибка выполнения заказа ${err}`);
		});
});

// Изменилось состояние валидации формы
events.on('formErrors:changed', (errors: Partial<IOrderData>) => {
	const { email, phone, address, payment } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

// Открытие модального окна
events.on('modal:open', () => {
	page.locked = true;
});

// Закрытие модального окна
events.on('modal:closed', () => {
	page.locked = false;
});
