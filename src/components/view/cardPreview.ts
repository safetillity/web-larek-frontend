import { IProduct, ICardPreview } from '../../types/index.ts';
import { Card } from '../view/card.ts';
import { IEvents } from '../base/events.ts';

export class CardPreview extends Card implements ICardPreview {
  button: HTMLElement;
  description: HTMLElement;
  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    super(template, events);
   this.button = this._element.querySelector('.card__button');
   this.description = this._element.querySelector('.card__text');
  }
  render(data: IProduct): HTMLElement {
   
  }
}
