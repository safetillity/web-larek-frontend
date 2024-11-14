## Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

npm install
npm run start
или

yarn
yarn start

## Сборка

npm run build
или

yarn build

## Архитектура проекта

Проект "Веб-ларек" основан на архитектурном паттерне Model-View-Presenter (MVP), который разделяет приложение на три основные компоненты:

- Model : Отвечает за управление данными, бизнес-логикой и правилами приложения .
- View : Отображает данные пользователю и отправляет команды пользователю в Presenter. В эту зону ответсвенности входит Отрисовка и обновление UI .
- Presenter : Связывает Model и View, обрабатывая данные и обновляя представление. В роли Presenter выступает Component. Процессы приложения реализованы через обработку событий. Компоненты, используют события для взаимодействия с пользователем, что позволяет динамически обновлять интерфейс.

## Взаимодействие частей

1.Пользователь взаимодействует с View (нажимает кнопку).
2.Presenter обрабатывает событие и запрашивает данные у Model.
3.Model передает данные Presenter.
4.Presenter обновляет View.

## Основные классы

## Слой Model

### 1. Класс Api

Класс **Api** является основой для взаимодействия с API. Он предоставляет методы для выполнения HTTP-запросов и обработки их ответов.

#### Конструктор:

```ts
constructor(baseUrl: string, options: RequestInit = {})
```

**Параметры:**

- `baseUrl: string` — базовый URL для API запросов.
- `options: RequestInit` — настройки запроса, такие как заголовки.

#### Тело конструктора:

- Инициализируется поле `baseUrl` с переданным значением.
- Создается объект `options`, в котором устанавливается заголовок `Content-Type` как `application/json`, и к нему добавляются другие переданные в `options` заголовки.

#### Поля:

- `baseUrl: string` — строка, содержащая базовый URL API.
- `options: RequestInit` — объект с настройками запроса.

#### Методы:

- `get(uri: string): Promise<object>` — выполняет GET запрос к указанному URI.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` — выполняет POST запрос с данными.

### 2. Класс ApiModel

Класс **ApiModel** наследуется от `Api` и добавляет специфические методы для работы с продуктами.

#### Конструктор:

```ts
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```

**Параметры:**

- `cdn: string` — URL для получения ресурсов (например, изображений).
- `baseUrl: string` — базовый URL для API запросов.
- `options?: RequestInit` — настройки запроса.

#### Тело конструктора:

- Вызывает конструктор родительского класса `Api` с параметрами `baseUrl` и `options`.
- Инициализируется поле `cdn` с переданным значением.

#### Поля:

- `cdn: string` — строка, содержащая URL CDN.
- `items: IProduct[]` — список продуктов.

#### Методы:

- `getListProductCard(): Promise<IProduct[]>` — получает список карточек продуктов.
- `postOrderLot(data: IOrderData): Promise<IOrderResult>` — отправляет заказ на сервер.

# Класс `appData`

Класс `appData` реализует интерфейс `IAppData` и управляет данными приложения, такими как каталог товаров и информация о заказе.

## Поля

- **`catalog: ICard[]`** — Массив товаров каталога. По умолчанию это пустой массив.
- **`order: IOrderData`** — Объект с информацией о заказе, содержащий следующие поля:
  - **`payment: string`** — Метод оплаты. По умолчанию это пустая строка.
  - **`email: string`** — Email пользователя.
  - **`phone: string`** — Телефон пользователя.
  - **`address: string`** — Адрес доставки.
- **`basketModel: IBasketModel`** — Модель корзины для управления данными корзины.

## Методы

### `setButtonStatus(item: ICard): boolean`

Устанавливает статус кнопки для товара в зависимости от условий.

### `setCatalog(items: ICard[]): void`

Устанавливает каталог товаров.

### `setAddress(address: string): string`

Устанавливает адрес доставки для заказа.

### `validateOrder(address: string): boolean`

Проверяет валидность адреса доставки.

### `setOrderContacts(contact: number | string): number | string`

Устанавливает контактные данные пользователя (номер телефона или email).
актные данные.

### `validateOrderContacts(contact: number | string): boolean`

Проверяет валидность контактных данных (телефон или email).

### `setPaymentSelection(payment: string): string`

Устанавливает метод оплаты для заказа.

### `validatePaymentSelection(payment: string): boolean`

Проверяет валидность метода оплаты.

### `clearOrderData(): void`

Очищает данные заказа, сбрасывая все поля до значений по умолчанию.

### 3. Класс BasketModel

Класс **BasketModel** управляет корзиной пользователя и реализует интерфейс `IBasketModel`.

#### Конструктор:

```ts
constructor();
```

#### Тело конструктора:

- Инициализирует поле basketList, которое представляет список продуктов в корзине, как пустой массив `[]`.

#### Поля:

- `basketList: IProduct[]` — список продуктов в корзине.

#### Методы:

- `countOrders(): number` — возвращает количество товаров в корзине.
- `countSum(): number` — возвращает общую сумму товаров.
- `setOrder(order: IProduct): void` — добавляет продукт в корзину.
- `deleteOrder(order: IProduct): void` — удаляет продукт из корзины.
- `clearOrders(): void` — чищает корзину, т.е. присваивает полю basketList пустой массив [].

### 4. Класс EventEmitter

Класс **EventEmitter** реализует систему событий и подписок. Реализует интерфейс `IEvents`.

#### Конструктор:

```ts
constructor();
```

#### Тело конструктора:

- Инициализирует поле events, которое является `Map<EventName, Set<Subscriber>>`. Эта карта хранит события и их подписчиков. Изначально это пустая карта.

#### Поля:

- `events: Map<EventName, Set<Subscriber>>` — карта событий и подписчиков.

#### Методы:

- `on<T>(event: EventName, callback: (data: T) => void): void` — подписывает на событие.
- `off(event: EventName, callback: Subscriber): void` — отписывает от события.
- `emit<T>(eventName: string, data?: T): void` — инициирует событие.
- `trigger<T>(event: string, context?: Partial<T>): (data: T) => void` — создает триггер для событий.

## Слой Presenter

### 5. Класс Component

Класс **Component** управляет отображением и состоянием элементов интерфейса, а также предоставляет методы для работы с HTML-элементами. Класс абстрактный и предназначен для расширения другими компонентами

#### Конструктор:

```ts
protected constructor(protected readonly container: HTMLElement)
```

#### Методы:

- `toggleClass(element: HTMLElement, className: string, state: boolean)` — добавляет или удаляет CSS-класс элемента в зависимости от значения state.
- `setText(element: HTMLElement, value: string)` — устанавливает текстовое содержимое элемента.
- `setDisabled(element: HTMLElement, state: boolean)` — включает или отключает элемент в зависимости от состояния.
- `setHidden(element: HTMLElement)` — скрывает элемент.
- `setVisible(element: HTMLElement)` — делает элемент видимым.
- `setImage(element: HTMLImageElement, src: string, alt?: string)` — задает изображение и альтернативный текст для HTML-элемента img.
- `render(data?: Partial<T>): HTMLElement` — 
отвечает за создание , и отображение HTML-элемента, и за динамическое обновление контента .

### Слой View

### 4. Класс Basket

Класс **Basket** отображает корзину на странице и расширяет класс `Component<IBasket>`.

#### Конструктор:

```ts
constructor(container: HTMLElement, template: HTMLTemplateElement, events: IEvents)
```

#### Тело конструктора:

- Вызывает конструктор родительского класса `Component` с параметром `container`.
- Инициализирует элементы разметки корзины, такие как:
  - `basket` — основной контейнер корзины.
  - `title` — заголовок модального окна корзины.
  - `basketList` — элемент для отображения списка товаров в корзине.
  - `button` — кнопка для оформления заказа.
  - `basketPrice` — элемент для отображения общей суммы заказа.
  - `basketButton` — кнопка открытия корзины.
  - `basketCounter` — элемент для отображения количества товаров в корзине.

#### Поля:

- `button: HTMLButtonElement` — кнопка оформления заказа.
- `basket: HTMLElement` — контейнер корзины.
- `basketPrice: HTMLElement` — отображение цены товаров в корзине.
- `basketList: HTMLElement` — список товаров в корзине.
- `basketCounter: HTMLElement` — счетчик товаров в корзине
- `title: HTMLElement` — заголовок корзины.
- `basketButton: HTMLElement` — иконка корзины на главной странице.

#### Методы:

- `render(): void` — отрисовывает корзину.
- `renderSum(sum: number): void` — отображает общую сумму товаров.
- `renderBasketCounter(value: number): void` — обновляет счетчик товаров , взаимодействуя с элементом header\_\_basket-counter ,а именно с счетчиком корзины на главной странице

### 5. Класс Card

Класс **Card** отображает карточку продукта и реализует интерфейс `ICard`.

#### Конструктор:

```ts
constructor(element: HTMLElement, events: IEvents)
```

#### Тело конструктора:

- Инициализирует элементы разметки карточки, такие как:
  - `element` — основной контейнер карточки продукта.
  - `category` — категория товара.
  - `title` — название товара.
  - `image` — изображение товара.
  - `price` — цена товара.

#### Поля:

- `element: HTMLElement` — контейнер карточки.
- `title: HTMLElement` — заголовок продукта.
- `image: HTMLElement` — изображение продукта.
- `categoty: HTMLElement` — категория продукта.
- `price: HTMLElement` — цена продукта.

#### Методы:

- `render(data: IProduct): HTMLElement` — отрисовывает карточку продукта.

### 6. Класс CardPreview

Класс **CardPreview** наследуется от `Card` и добавляет описание и кнопку к карточке продукта.

#### Конструктор:

```ts
constructor(template: HTMLTemplateElement, events: IEvents)
```

#### Тело конструктора:

- Вызывает конструктор родительского класса `Card`.
- Инициализирует дополнительные элементы разметки:
  - `button` — кнопка добавления в корзину.
  - `description` — описание товара.

#### Поля:

- `button: HTMLElement` — кнопка добавления в корзину.
- `description: HTMLElement` — описание продукта.

#### Методы:

- `render(data: IProduct): HTMLElement` — отрисовывает карточку с описанием.

### 7. Класс `BaseForm`

Класс `BaseForm` реализует интерфейс `IBaseForm` и реализует базовую форму с полями ввода, кнопкой отправки и отображением ошибок валидации.

## Конструктор

constructor(template: HTMLTemplateElement, events: IEvents);

### Тело конструктора

Инициализирует элементы формы на основе переданного шаблона `template`:

- **form** — элемент формы, клонированный из шаблона.
- **inputs** — массив всех полей ввода (`.form__input`) формы.
- **submitButton** — кнопка отправки формы.
- **validationErrors** — элемент для отображения ошибок валидации.

### Параметры

- **template**: `HTMLTemplateElement` — шаблон HTML для формы.
- **events**: `IEvents` — объект для работы с событиями.

## Поля

- **form**: `HTMLFormElement` — HTML-форма.
- **inputs**: `HTMLInputElement[]` — массив полей ввода формы.
- **submitButton**: `HTMLButtonElement` — кнопка отправки формы.
- **validationErrors**: `HTMLElement` — контейнер для отображения ошибок валидации.

## Методы

- **render()**: `HTMLElement` — отрисовывает и возвращает форму.

### 8. Класс `OrderForm`

Класс `OrderForm` расширяет класс `BaseForm` и реализует интерфейс `IOrderForm` , класс для формы заказа с выбором оплаты и адресом доставки

## Конструктор

constructor(template: HTMLTemplateElement, events: IEvents);

### Тело конструктора

- Вызывает конструктор родительского класса `BaseForm` и передает ему шаблон и объект событий.
- Инициализирует элементы:
  - **choiceButtons** — массив кнопок выбора метода оплаты.
  - **buttonSubmit** — кнопка отправки заказа.

### Параметры

- **template**: `HTMLTemplateElement` — шаблон HTML для формы заказа.
- **events**: `IEvents` — объект для работы с событиями.

## Поля

- **choiceButtons**: `HTMLButtonElement[]` — кнопки для выбора метода оплаты.
- **buttonSubmit**: `HTMLButtonElement` — кнопка для отправки заказа.

## Методы

- **set paymentSelection(paymentMethod: string)** — устанавливает выбранный метод оплаты.
- **render()**: `HTMLElement` — отрисовывает и возвращает форму заказа.

### 9. Класс `ContactsForm`

Класс `ContactsForm` расширяет класс `BaseForm` , класс для формы с контактами клиента

## Конструктор

constructor(template: HTMLTemplateElement, events: IEvents);

### Тело конструктора

- Вызывает конструктор родительского класса `BaseForm` и передает ему шаблон и объект событий.
- Не добавляет дополнительных полей, так как наследует всю логику от базовой формы.

### Параметры

- **template**: `HTMLTemplateElement` — шаблон HTML для формы контактных данных.
- **events**: `IEvents` — объект для работы с событиями.

## Методы

- **render()**: `HTMLElement` — отрисовывает и возвращает форму контактных данных, используя метод `render()` базового класса.

### 10. Класс Modal

Класс **Modal** управляет модальными окнами и расширяет `Component<IModal>`.

#### Конструктор:

```ts
constructor(modalContainer: HTMLElement, container: HTMLElement, events: IEvents)
```

#### Тело конструктора:

- Вызывает конструктор родительского класса `Component` с параметром `container`.
- Инициализирует элементы:
  - `closeButton` — кнопка закрытия модального окна.
  - `content` — контейнер для содержимого модального окна.
- Добавляет обработчик клика для закрытия окна через `closeButton`.

#### Поля:

- `closeButton: HTMLButtonElement` — кнопка закрытия модального окна.
- `content: HTMLElement` — содержимое модального окна.

#### Методы:

- `open(): void` — открывает модальное окно.
- `close(): void` — закрывает модальное окно.

### 11. Класс Order

Класс **Order** отображает заказ и управляет его состоянием и реализует интерфейс `IOrderForm`.

#### Конструктор:

```ts
constructor(template: HTMLTemplateElement, basket: Basket, events: IEvents)
```

#### Тело конструктора:

- Инициализирует элементы формы:
  - `form` — основной элемент формы заказа.
  - `buttonAll` — массив кнопок выбора.
  - `buttonSubmit` — кнопка отправки заказа.
  - `validationErrors` — контейнер для отображения ошибок валидации.

#### Поля:

- `orderList: HTMLElement` — список заказанных товаров.
- `orderTotal: HTMLElement` — общая сумма заказа.
- `basket: Basket` — объект корзины.

#### Методы:

- `render(): void` — отрисовывает заказ.

### 12. Класс Success

Класс **Success** отвечает за отображение успешного оформления заказа.

#### Конструктор:

```ts
constructor(template: HTMLTemplateElement, events: IEvents)
```

#### Тело конструктора:

- Инициализирует элементы:
  - `success` — основной контейнер успешного сообщения.
  - `description` — описание успешного заказа.
  - `button` — кнопка для закрытия сообщения или перехода на другую страницу.

#### Параметры:

- `template: HTMLTemplateElement` — шаблон успешного сообщения.
- `events: IEvents` — объект для работы с событиями.

#### Поля:

- `element: HTMLElement` — контейнер с сообщением об успехе.
- `button: HTMLButtonElement` — кнопка для закрытия сообщения или перехода на другую страницу.

#### Методы:

- `render(): HTMLElement` — отрисовывает сообщение об успешной операции.
