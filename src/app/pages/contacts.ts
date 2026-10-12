import { Component } from '@angular/core';
import { COMPANY } from '../core/data';
import { LeadForm } from '../shared/lead-form';

@Component({
  selector: 'app-contacts',
  imports: [LeadForm],
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>Контакты</h1>
        <p>{{ c.hours }}. {{ c.hoursNote }}.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap cols">
        <div>
          <dl>
            <dt>Сервисный центр</dt>
            <dd><a [href]="'tel:' + c.phoneHref">{{ c.phone }}</a></dd>
            <dt>Бухгалтерия</dt>
            <dd><a [href]="'tel:' + c.phoneAccountingHref">{{ c.phoneAccounting }}</a></dd>
            <dt>Почта</dt>
            <dd><a [href]="'mailto:' + c.email">{{ c.email }}</a></dd>
            <dt>Адрес</dt>
            <dd>{{ c.address }}</dd>
          </dl>
          <div class="map" role="img" aria-label="Место для карты проезда">
            Здесь будет карта. Вставьте виджет Яндекс.Карт или 2ГИС с вашим адресом.
          </div>
        </div>
        <aside>
          <h2>Записаться на ремонт</h2>
          <app-lead-form mode="booking" idPrefix="contacts" />
        </aside>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid;
      grid-template-columns: 1fr 0.9fr;
      gap: clamp(28px, 5vw, 64px);
      align-items: start;
    }
    dt {
      font-size: 0.85rem;
      color: var(--muted);
    }
    dd {
      margin: 0 0 18px;
      font: 700 1.25rem var(--font-head);
    }
    dd a {
      color: var(--ink);
    }
    .map {
      min-height: 280px;
      display: grid;
      place-items: center;
      text-align: center;
      padding: 24px;
      background: var(--mint-2);
      border: 2px dashed #9aa6a9;
      border-radius: 24px;
      color: var(--muted);
    }
    aside {
      background: var(--white);
      padding: 28px;
      border-radius: 24px;
      border: 1px solid var(--line);
    }
    @media (max-width: 860px) {
      .cols {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Contacts {
  protected readonly c = COMPANY;
}
