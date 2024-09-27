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
- Presenter : Связывает Model и View, обрабатывая данные и обновляя представление. В роли Presenter выступает EventEmitter. Процессы приложения реализованы через обработку событий. Компоненты, такие как Modal и Component, используют события для взаимодействия с пользователем, что позволяет динамически обновлять интерфейс.

## Взаимодействие частей

1.Пользователь взаимодействует с View (нажимает кнопку).
2.Presenter обрабатывает событие и запрашивает данные у Model.
3.Model передает данные Presenter.
4.Presenter обновляет View.

## Основные классы

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

### 3. Класс BasketModel

Класс **BasketModel** управляет корзиной пользователя и реализует интерфейс `IBasketModel`.

#### Конструктор:

```ts
constructor();
```

#### Тело конструктора:

- Инициализирует поле `_basketList`, которое представляет список продуктов в корзине, как пустой массив `[]`.

#### Поля:

- `_basketList: IProduct[]` — список продуктов в корзине.

#### Методы:

- `countOrders(): number` — возвращает количество товаров в корзине.
- `countSum(): number` — возвращает общую сумму товаров.
- `setOrder(order: IProduct): void` — добавляет продукт в корзину.
- `deleteOrder(order: IProduct): void` — удаляет продукт из корзины.
- `clearOrders(basketList: IProduct[]): void` — очищает корзину.

### 4. Класс FormModel

Класс **FormModel** отвечает за обработку и валидацию данных формы заказа и реализует интерфейс `IFormModel`.

#### Конструктор:

```ts
constructor(events: IEvents)
```

#### Тело конструктора:

- Инициализирует поля:
  - `payment: string` — строка для хранения метода оплаты, по умолчанию пустая строка.
  - `email: string` — строка для хранения электронной почты.
  - `phone: string` — строка для хранения номера телефона.
  - `address: string` — строка для хранения адреса доставки.
  - `total: number` — общая сумма заказа, по умолчанию 0.
  - `items: string[]` — массив товаров в заказе, по умолчанию пустой массив.
  - `validationErrors: validationErrors` — объект для хранения ошибок валидации, по умолчанию пустой объект.
- Сохраняет объект событий в поле `events`.

#### Параметры:

- `events: IEvents` — объект для работы с событиями.

#### Поля:

- `payment: string` — способ оплаты.
- `email: string` — email пользователя.
- `phone: string` — телефон пользователя.
- `address: string` — адрес доставки.
- `total: number` — итоговая сумма заказа.
- `items: string[]` — список заказанных товаров.
- `validationErrors: validationErrors` — ошибки валидации.

#### Методы:

- `setOrder(address: string): string` — устанавливает адрес доставки.
- `validateOrder(address: string): boolean` — валидирует адрес доставки.
- `setPaymentSelection(payment: string): string` — устанавливает способ оплаты.
- `validatePaymentSelection(payment: string): boolean` — валидирует способ оплаты.

### 5. Класс EventEmitter

Класс **EventEmitter** реализует систему событий и подписок. Реализует интерфейс `IEvents`.

#### Конструктор:

```ts
constructor();
```

#### Тело конструктора:

- Инициализирует поле `_events`, которое является `Map<EventName, Set<Subscriber>>`. Эта карта хранит события и их подписчиков. Изначально это пустая карта.

#### Поля:

- `_events: Map<EventName, Set<Subscriber>>` — карта событий и подписчиков.

#### Методы:

- `on<T>(event: EventName, callback: (data: T) => void): void` — подписывает на событие.
- `off(event: EventName, callback: Subscriber): void` — отписывает от события.
- `emit<T>(eventName: string, data?: T): void` — инициирует событие.
- `trigger<T>(event: string, context?: Partial<T>): (data: T) => void` — создает триггер для событий.

### 6. Класс Basket

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

- `sum: number` — общая сумма товаров.
- `button: HTMLButtonElement` — кнопка оформления заказа.
- `basket: HTMLElement` — контейнер корзины.
- `basketPrice: HTMLElement` — отображение цены товаров в корзине.
- `basketList: HTMLElement` — список товаров в корзине.
- `basketCounter: HTMLElement` — счетчик товаров в корзине.
- `title: HTMLElement` — заголовок корзины.
- `basketButton: HTMLElement` — кнопка открытия корзины.

#### Методы:

- `render(): void` — отрисовывает корзину.
- `renderSum(sum: number): void` — отображает общую сумму товаров.
- `renderBasketCounter(value: number): void` — обновляет счетчик товаров.

### 7. Класс Card

Класс **Card** отображает карточку продукта и реализует интерфейс `ICard`.

#### Конструктор:

```ts
constructor(template: HTMLTemplateElement, events: IEvents)
```

#### Тело конструктора:

- Инициализирует элементы разметки карточки, такие как:
  - `_element` — основной контейнер карточки продукта.
  - `_category` — категория товара.
  - `_title` — название товара.
  - `_image` — изображение товара.
  - `_price` — цена товара.

#### Поля:

- `_element: HTMLElement` — контейнер карточки.
- `_id: HTMLElement` — элемент с ID продукта.
- `_title: HTMLElement` — заголовок продукта.
- `_image: HTMLElement` — изображение продукта.
- `_categoty: HTMLElement` — категория продукта.
- `_price: HTMLElement` — цена продукта.

#### Методы:

- `render(data: IProduct): HTMLElement` — отрисовывает карточку продукта.

### 8. Класс CardPreview

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

### 9. Класс ContactsForm

Класс **ContactsForm** отвечает за отображение и валидацию контактных данных пользователя.

#### Конструктор:

```ts
constructor(template: HTMLTemplateElement, events: IEvents)
```

#### Тело конструктора:

- Инициализирует элементы формы:
  - `form` — основной элемент формы.
  - `inputs` — массив полей ввода.
  - `submitButton` — кнопка отправки формы.
  - `validationErrors` — контейнер для отображения ошибок валидации.

#### Поля:

- `form: HTMLFormElement` — форма контактных данных.
- `inputs: HTMLInputElement[]` — массив инпутов для ввода данных.
- `submitButton: HTMLButtonElement` — кнопка отправки формы.
- `validationErrors: HTMLElement` — блок с ошибками валидации.

#### Методы:

- `render(): void` — отрисовывает форму.

### 10. Класс Modal

Класс **Modal** управляет модальными окнами и расширяет `Component<IModal>`.

#### Конструктор:

```ts
constructor(modalContainer: HTMLElement, container: HTMLElement, events: IEvents)
```

#### Тело конструктора:

- Вызывает конструктор родительского класса `Component` с параметром `container`.
- Инициализирует элементы:
  - `_closeButton` — кнопка закрытия модального окна.
  - `content` — контейнер для содержимого модального окна.
- Добавляет обработчик клика для закрытия окна через `_closeButton`.

#### Поля:

- `_closeButton: HTMLButtonElement` — кнопка закрытия модального окна.
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

- `_orderList: HTMLElement` — список заказанных товаров.
- `_orderTotal: HTMLElement` — общая сумма заказа.
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

- `_element: HTMLElement` — контейнер с сообщением об успехе.
- `_button: HTMLButtonElement` — кнопка для закрытия сообщения или перехода на другую страницу.

#### Методы:

- `render(): HTMLElement` — отрисовывает сообщение об успешной операции.
