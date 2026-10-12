import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, SERVICES } from '../core/data';
import { LeadService } from '../core/lead.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer>
      <div class="wrap grid">
        <div>
          <b class="brand">{{ c.name }}</b>
          <p>{{ c.tagline }}. Работаем с {{ c.founded }} года.</p>
          <button type="button" class="btn btn--primary" (click)="leads.open('callback')">
            Заказать звонок
          </button>
        </div>
        <div>
          <h3>Услуги</h3>
          <ul>
            @for (s of services; track s.slug) {
              <li><a [routerLink]="['/services', s.slug]">{{ s.title }}</a></li>
            }
          </ul>
        </div>
        <div>
          <h3>Компания</h3>
          <ul>
            <li><a routerLink="/about">О компании</a></li>
            <li><a routerLink="/brands">Марки техники</a></li>
            <li><a routerLink="/reviews">Отзывы</a></li>
            <li><a routerLink="/news">Новости</a></li>
            <li><a routerLink="/contacts">Контакты</a></li>
          </ul>
        </div>
        <div>
          <h3>Контакты</h3>
          <ul>
            <li><a [href]="'tel:' + c.phoneHref">{{ c.phone }}</a> сервис</li>
            <li><a [href]="'tel:' + c.phoneAccountingHref">{{ c.phoneAccounting }}</a> бухгалтерия</li>
            <li><a [href]="'mailto:' + c.email">{{ c.email }}</a></li>
            <li>{{ c.address }}</li>
            <li>{{ c.hours }}</li>
          </ul>
        </div>
      </div>
      <div class="wrap legal">
        <span>© {{ year }} {{ c.name }}</span>
        <span>{{ c.hoursNote }}</span>
      </div>
    </footer>
  `,
  styles: `
    footer {
      background: var(--forest);
      color: #bcd9cc;
      padding-top: 56px;
      font-size: 0.95rem;
    }
    .grid {
      display: grid;
      grid-template-columns: 1.2fr 1.3fr 1fr 1.3fr;
      gap: 32px;
    }
    .brand {
      font: 800 1.3rem var(--font-head);
      color: var(--white);
      display: block;
      margin-bottom: 8px;
    }
    h3 {
      color: var(--white);
      font-size: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 8px;
    }
    a {
      color: #e3f1ea;
    }
    a:hover {
      color: var(--accent);
    }
    .legal {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 40px;
      padding-block: 20px;
      border-top: 1px solid rgba(255,255,255,0.15);
      font-size: 0.85rem;
    }
    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 560px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Footer {
  protected readonly c = COMPANY;
  protected readonly services = SERVICES;
  protected readonly leads = inject(LeadService);
  protected readonly year = new Date().getFullYear();
}
