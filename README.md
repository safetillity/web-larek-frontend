# Проектная работа "Веб-ларек"

## Стек

HTML, SCSS, TS, Webpack

## Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

## Важные файлы

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды:

```bash
npm install
npm run start
или

bash



yarn
yarn start
Сборка
bash



npm run build
или

bash



yarn build
Архитектура проекта
Проект "Веб-ларек" основан на архитектурном паттерне Model-View-Presenter (MVP), который разделяет приложение на три основные компоненты:

Model: Отвечает за управление данными, бизнес-логикой и правилами приложения.
View: Отображает данные пользователю и отправляет команды пользователю в Presenter. В эту зону ответственности входит отрисовка и обновление UI.
Presenter: Связывает Model и View, обрабатывая данные и обновляя представление. В роли Presenter выступает Component. Процессы приложения реализованы через обработку событий. Компоненты используют события для взаимодействия с пользователем, что позволяет динамически обновлять интерфейс.
Взаимодействие частей
Пользователь взаимодействует с View (нажимает кнопку).
Presenter обрабатывает событие и запрашивает данные у Model.
Model передает данные Presenter.
Presenter обновляет View.


Основные классы

Слой Model

1. Класс Api
Класс Api является основой для взаимодействия с API. Он предоставляет методы для выполнения HTTP-запросов и обработки их ответов.

Конструктор:

constructor(baseUrl: string, options: RequestInit = {})
Параметры:

baseUrl: string — базовый URL для API запросов.
options: RequestInit — настройки запроса, такие как заголовки.
Методы:

get(uri: string): Promise<object> — выполняет GET запрос к указанному URI.
post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object> — выполняет POST запрос с данными.
2. Класс ApiModel
Класс ApiModel наследуется от Api и реализует IApi, добавляя специфические методы для работы с продуктами.

Конструктор:

constructor(cdn: string, baseUrl: string, options?: RequestInit)
Методы:

getProductItem(id: string): Promise<ICard> — получает информацию о конкретном продукте по его идентификатору.
getProductList(): Promise<ICard[]> — получает список продуктов.
orderItems(order: IOrderData): Promise<IOrderResults> — размещает заказ.
3. Класс appData
Класс appData управляет данными приложения, такими как каталог товаров и информация о заказе.

Поля:

basket: ICard[] — массив корзины.
catalog: ICard[] — массив товаров каталога.
order: IOrderData — объект с информацией о заказе.
Методы:

setButtonStatus(item: ICard): boolean
setCatalog(items: ICard[]): void
setAddress(address: string): string
validateOrder(address: string): boolean
setOrderContacts(contact: number | string): number | string
validateOrderContacts(contact: number | string): boolean
setPaymentSelection(payment: string): string
validatePaymentSelection(payment: string): boolean
clearOrderData(): void
Слой Presenter
4. Класс EventEmitter
Класс EventEmitter реализует систему событий и подписок.

Методы:
on<T>(event: EventName, callback: (data: T) => void): void — подписывает на событие.
off(event: EventName, callback: Subscriber): void — отписывает от события.
emit<T>(eventName: string, data?: T): void — инициирует событие.
trigger<T>(event: string, context?: Partial<T>): (data: T) => void — создает триггер для событий.

5. Класс Component
Класс Component управляет отображением и состоянием элементов интерфейса.

Конструктор:


protected constructor(protected readonly container: HTMLElement)
Методы:

toggleClass(element: HTMLElement, className: string, state: boolean)
setText(element: HTMLElement, value: string)
setDisabled(element: HTMLElement, state: boolean)
setHidden(element: HTMLElement)
setVisible(element: HTMLElement)
setImage(element: HTMLImageElement, src: string, alt?: string)
render(data?: Partial<T>): HTMLElement
Слой View
6. Класс Basket
Класс BasketModel управляет корзиной пользователя и отображает корзину на странице.

Конструктор:


constructor(container: HTMLElement, protected events: IEvents);
Методы:

set items(items: HTMLElement[]): void
set total(total: number): void
7. Класс Card
Класс Card отображает карточку продукта и реализует интерфейс ICard.

Конструктор:

constructor(container: HTMLElement, actions?: ICardActions);
Методы:

set id(value: string): void
get id(): string
set title(value: string): void
get title(): string
set description(value: string): void
get description(): string
set price(value: string): void
get price(): string
set image(value: string): void
set category(value: string): void
get category(): string
set button(value: string): void
8. Класс BasketCard
Класс BasketCard расширяет класс Card и предназначен для отображения карточки товара в корзине.

Конструктор:

constructor(container: HTMLElement, actions?: ICardActions);
Методы:

set index(value: number): void
9. Класс Form
Класс Form реализует интерфейс IForm и представляет собой базовую форму.

Конструктор:

constructor(container: HTMLFormElement, events: IEvents);
Методы:

set valid(value: boolean): void
set errors(value: string): void
clearValue(): void
render(state: Partial<T> & IForm): HTMLElement
10. Класс OrderForm
Класс OrderForm расширяет класс Form и предназначен для создания формы заказа.

Конструктор:

constructor(container: HTMLFormElement, events: IEvents);
Методы:

set address(value: string): void
togglePayment(value: HTMLElement): void
clearPayment(): void
11. Класс ContactsForm
Класс ContactsForm расширяет класс Form и предназначен для сбора контактных данных клиента.

Конструктор:

constructor(container: HTMLFormElement, events: IEvents);
Методы:

set email(value: string): void
set phone(value: string): void
12. Класс Modal
Класс Modal управляет модальными окнами и расширяет класс Component<IModal>.

Конструктор:

constructor(container: HTMLElement, events: IEvents);
Методы:

set content(value: HTMLElement): void
open(): void
close(): void
13. Класс Page
Класс Page управляет страницей приложения и расширяет класс Component<IPage>.

Конструктор:

constructor(container: HTMLElement, events: IEvents);
Методы:
   - `set counter(value: number): void`
   - `set catalog(items: HTMLElement[]): void`
   - `set locked(value: boolean): void`

14. Класс Success
Класс **Success** отвечает за отображение успешного оформления заказа.

- **Конструктор**:

constructor(template: HTMLTemplateElement, events: IEvents)


- **Методы**:
- `render(): HTMLElement`
- `set total(value: string): void`

```
