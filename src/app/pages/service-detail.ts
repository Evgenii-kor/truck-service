import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { effect } from '@angular/core';
import { SERVICES, COMPANY } from '../core/data';
import { LeadService } from '../core/lead.service';
import { NotFound } from './not-found';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, NotFound, Icon],
  template: `
    @if (service(); as s) {
      <section class="page-head">
        <div class="wrap">
          <p class="crumbs"><a routerLink="/services">Услуги</a> / {{ s.title }}</p>
          <div class="title">
            <span class="ico"><app-icon [name]="s.icon" /></span>
            <div>
              <h1>{{ s.title }}</h1>
              <p>{{ s.short }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="wrap grid">
          <div>
            <p class="lede">{{ s.description }}</p>
            <h2>Что входит</h2>
            <ul class="works">
              @for (w of s.works; track w) {
                <li>{{ w }}</li>
              }
            </ul>
            <h2>Что дальше</h2>
            <p>
              Вы оставляете заявку, мы осматриваем машину, называем цену и срок. Работы начинаем только
              после вашего согласия со сметой.
            </p>
          </div>
          <aside>
            <dl>
              <dt>Стоимость</dt>
              <dd>{{ s.from ? 'от ' + s.from.toLocaleString('ru') + ' ₽' : 'по смете' }}</dd>
              <dt>Срок</dt>
              <dd>{{ s.duration }}</dd>
              <dt>Гарантия</dt>
              <dd>указываем в заказ-наряде</dd>
            </dl>
            <button type="button" class="btn btn--primary full" (click)="leads.open('booking', s.title)">
              Записаться на эту услугу
            </button>
            <a class="btn btn--ghost full call" [href]="'tel:' + c.phoneHref">{{ c.phone }}</a>
          </aside>
        </div>
      </section>
      <section class="section section--white">
        <div class="wrap">
          <h2>Другие услуги</h2>
          <ul class="more">
            @for (o of others(); track o.slug) {
              <li><a [routerLink]="['/services', o.slug]">{{ o.title }}</a></li>
            }
          </ul>
        </div>
      </section>
    } @else {
      <app-not-found />
    }
  `,
  styles: `
    .title {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .ico {
      display: grid;
      place-items: center;
      width: 72px;
      height: 72px;
      border-radius: 20px;
      background: var(--white);
      color: var(--forest);
      flex: none;
      --icon-size: 40px;
    }
    .title h1 {
      margin-bottom: 0.2em;
    }
    .grid {
      display: grid;
      grid-template-columns: 1.4fr 0.6fr;
      gap: clamp(28px, 5vw, 64px);
      align-items: start;
    }
    .works {
      list-style: none;
      padding: 0;
      margin: 0 0 32px;
    }
    .works li {
      padding: 14px 0 14px 34px;
      border-bottom: 1px solid var(--line);
      position: relative;
    }
    .works li::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 21px;
      width: 12px;
      height: 7px;
      border-left: 3px solid var(--brand);
      border-bottom: 3px solid var(--brand);
      transform: rotate(-45deg);
    }
    aside {
      background: var(--white);
      padding: 24px;
      border-radius: 24px;
      border: 1px solid var(--line);
      position: sticky;
      top: 110px;
    }
    dl {
      margin: 0 0 20px;
    }
    dt {
      font-size: 0.85rem;
      color: var(--muted);
    }
    dd {
      margin: 0 0 14px;
      font: 700 1.2rem var(--font-head);
    }
    .full {
      width: 100%;
    }
    .call {
      margin-top: 10px;
      color: var(--ink);
    }
    .more {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .more a {
      display: block;
      padding: 10px 16px;
      border: 2px solid var(--forest);
      border-radius: 999px;
      text-decoration: none;
      color: var(--ink);
      font-weight: 500;
    }
    .more a:hover {
      background: var(--forest);
      color: var(--white);
    }
    @media (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr;
      }
      aside {
        position: static;
      }
    }
  `,
})
export class ServiceDetail {
  protected readonly leads = inject(LeadService);
  private readonly title = inject(Title);
  protected readonly c = COMPANY;

  readonly slug = input<string>();
  protected readonly service = computed(() => SERVICES.find((s) => s.slug === this.slug()));
  protected readonly others = computed(() => SERVICES.filter((s) => s.slug !== this.slug()).slice(0, 8));

  constructor() {
    effect(() => {
      const s = this.service();
      this.title.setTitle(s ? `${s.title} — ${COMPANY.name}` : `Страница не найдена — ${COMPANY.name}`);
    });
  }
}
