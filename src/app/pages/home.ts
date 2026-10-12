import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BENEFITS, BRANDS, COMPANY, FAQ, PROBLEMS, REVIEWS, SERVICES, SHOPS, STEPS } from '../core/data';
import { LeadService } from '../core/lead.service';
import { LeadForm } from '../shared/lead-form';
import { Icon } from '../shared/icon';
import { Art } from '../shared/art';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LeadForm, Icon, Art],
  template: `
    <section class="hero">
      <div class="wrap hero-in">
        <div class="copy">
          <h1>Ремонт грузовиков, в котором всё понятно заранее</h1>
          <p class="lede">
            Называем цену и срок до начала работ, присылаем фото с поста и даём гарантию в заказ-наряде.
            Тягачи, прицепы, рефрижераторы.
          </p>

          <p class="ask" id="ask">Что с машиной?</p>
          <ul class="chips" aria-labelledby="ask">
            @for (p of problems; track p.label) {
              <li>
                <button type="button" (click)="leads.open('booking', p.service)">
                  <app-icon [name]="p.icon" />
                  {{ p.label }}
                </button>
              </li>
            }
          </ul>

          <div class="cta">
            <button type="button" class="btn btn--primary" (click)="leads.open('booking')">
              Записаться на ремонт
            </button>
            <a class="btn btn--ghost" [href]="'tel:' + c.phoneHref">
              <app-icon name="phone" />
              {{ c.phone }}
            </a>
          </div>
        </div>
        <app-art name="hero" class="art" />
      </div>
    </section>

    <section class="benefits">
      <ul class="wrap">
        @for (b of benefits; track b.title) {
          <li>
            <span class="ico"><app-icon [name]="b.icon" /></span>
            <div>
              <h3>{{ b.title }}</h3>
              <p>{{ b.text }}</p>
            </div>
          </li>
        }
      </ul>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="sec-head">
          <h2>Что мы чиним</h2>
          <a routerLink="/services">Все услуги <app-icon name="arrow" /></a>
        </div>
        <ul class="svc">
          @for (s of top; track s.slug) {
            <li>
              <a [routerLink]="['/services', s.slug]">
                <span class="ico"><app-icon [name]="s.icon" /></span>
                <h3>{{ s.title }}</h3>
                <p>{{ s.short }}</p>
                <span class="price">{{ s.from ? 'от ' + s.from.toLocaleString('ru') + ' ₽' : 'по смете' }}</span>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="section section--dark">
      <div class="wrap shops">
        <app-art name="workshop" class="art" />
        <div>
          <h2>Свои цеха под одной крышей</h2>
          <p>
            Не отправляем вас по подрядчикам: слесарные, кузовные и токарные работы делаем сами.
            Меньше передач между исполнителями — быстрее и дешевле.
          </p>
          <ul class="shop-list">
            @for (s of shops; track s.title) {
              <li>
                <span class="ico"><app-icon [name]="s.icon" /></span>
                <div>
                  <h3>{{ s.title }}</h3>
                  <p>{{ s.text }}</p>
                </div>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <h2>Как проходит ремонт</h2>
        <ol class="steps">
          @for (s of steps; track s.title; let i = $index) {
            <li>
              <span class="num">{{ i + 1 }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="alarm">
      <div class="wrap alarm-in">
        <span class="ico"><app-icon name="tow" /></span>
        <div>
          <h2>Машина встала на трассе?</h2>
          <p>Позвоните диспетчеру: назовём время подачи эвакуатора и стоимость, пока вы на линии.</p>
        </div>
        <a class="btn btn--primary" [href]="'tel:' + c.phoneHref">
          <app-icon name="phone" />
          {{ c.phone }}
        </a>
      </div>
    </section>

    <section class="section section--white">
      <div class="wrap">
        <div class="sec-head">
          <h2>Обслуживаем технику марок</h2>
          <a routerLink="/brands">Подробнее <app-icon name="arrow" /></a>
        </div>
        <ul class="brands">
          @for (b of brands; track b) {
            <li>
              <app-icon name="truck" />
              {{ b }}
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="sec-head">
          <h2>Нам доверяют автопарки</h2>
          <a routerLink="/reviews">Все отзывы <app-icon name="arrow" /></a>
        </div>
        <div class="rev">
          @for (r of reviews; track $index) {
            <blockquote>
              <p>{{ r.text }}</p>
              <footer>{{ r.person }}, {{ r.company }}</footer>
            </blockquote>
          }
        </div>
        <p class="sample">Образцы отзывов. Замените реальными в файле core/data.ts.</p>
      </div>
    </section>

    <section class="section section--white">
      <div class="wrap two">
        <div>
          <h2>Частые вопросы</h2>
          @for (f of faq; track f.q; let i = $index) {
            <div class="acc">
              <button
                type="button"
                [attr.aria-expanded]="openFaq() === i"
                [attr.aria-controls]="'faq' + i"
                (click)="openFaq.set(openFaq() === i ? -1 : i)"
              >
                {{ f.q }}
                <app-icon [name]="openFaq() === i ? 'minus' : 'plus'" />
              </button>
              @if (openFaq() === i) {
                <p [id]="'faq' + i">{{ f.a }}</p>
              }
            </div>
          }
        </div>
        <aside class="form-card" id="callback">
          <h2>Перезвоним за 10 минут</h2>
          <p>Обсудим задачу, назовём срок и запишем на удобное время.</p>
          <app-lead-form mode="callback" idPrefix="home" />
        </aside>
      </div>
    </section>
  `,
  styles: `
    .ico {
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: var(--mint);
      color: var(--forest);
      flex: none;
      --icon-size: 28px;
    }
    .hero {
      background: linear-gradient(180deg, var(--mint) 0%, var(--bg) 100%);
      padding-block: clamp(32px, 6vw, 72px) clamp(24px, 4vw, 48px);
    }
    .hero-in {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: clamp(24px, 5vw, 56px);
      align-items: center;
    }
    .ask {
      margin: 28px 0 10px;
      font: 600 1rem var(--font-body);
    }
    .chips {
      list-style: none;
      margin: 0 0 28px;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .chips button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 46px;
      padding: 0 16px 0 12px;
      background: var(--white);
      border: 2px solid var(--mint-2);
      border-radius: 999px;
      font: 500 0.95rem var(--font-body);
      color: var(--ink);
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      --icon-size: 22px;
    }
    .chips button:hover {
      border-color: var(--forest);
      background: var(--mint);
    }
    .chips app-icon {
      color: var(--forest-2);
    }
    .cta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .cta .btn--ghost {
      color: var(--forest);
      border-color: var(--forest);
      --icon-size: 20px;
    }

    .benefits {
      padding-block: 8px 0;
    }
    .benefits ul {
      list-style: none;
      margin-block: 0;
      padding: 28px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 24px;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 20px;
    }
    .benefits li {
      display: flex;
      gap: 14px;
    }
    .benefits h3 {
      margin-bottom: 4px;
    }
    .benefits p {
      margin: 0;
      font-size: 0.92rem;
      color: var(--muted);
    }

    .sec-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 16px;
      margin-bottom: 28px;
    }
    .sec-head h2 {
      margin: 0;
    }
    .sec-head a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      white-space: nowrap;
      --icon-size: 18px;
    }

    .svc {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .svc a {
      display: flex;
      flex-direction: column;
      gap: 8px;
      height: 100%;
      padding: 24px;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 20px;
      color: inherit;
      text-decoration: none;
      transition: border-color 0.15s, transform 0.15s;
    }
    .svc a:hover {
      border-color: var(--forest);
      transform: translateY(-3px);
    }
    .svc h3 {
      margin: 10px 0 0;
    }
    .svc p {
      color: var(--muted);
      font-size: 0.93rem;
      flex: 1;
      margin: 0;
    }
    .price {
      margin-top: 6px;
      font: 600 0.95rem var(--font-head);
      color: var(--forest);
    }

    .shops {
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      gap: clamp(24px, 5vw, 64px);
      align-items: center;
    }
    .shop-list {
      list-style: none;
      padding: 0;
      margin: 24px 0 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 18px;
    }
    .shop-list li {
      display: flex;
      gap: 12px;
    }
    .shop-list .ico {
      background: rgba(255, 255, 255, 0.12);
      color: var(--accent);
      width: 46px;
      height: 46px;
    }
    .shop-list h3 {
      margin-bottom: 2px;
      font-size: 0.98rem;
    }
    .shop-list p {
      margin: 0;
      font-size: 0.9rem;
    }

    .steps {
      list-style: none;
      padding: 0;
      margin: 32px 0 0;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
    }
    .steps li {
      position: relative;
      padding-top: 4px;
    }
    .steps li:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 24px;
      left: 56px;
      right: -8px;
      border-top: 2px dashed var(--mint-2);
    }
    .num {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      margin-bottom: 14px;
      border-radius: 50%;
      background: var(--forest);
      color: var(--white);
      font: 600 1.1rem var(--font-head);
      position: relative;
      z-index: 1;
    }
    .steps p {
      font-size: 0.93rem;
      color: var(--muted);
    }

    .alarm {
      background: var(--accent);
      color: var(--on-accent);
    }
    .alarm-in {
      display: flex;
      align-items: center;
      gap: 24px;
      padding-block: 32px;
      flex-wrap: wrap;
    }
    .alarm .ico {
      background: rgba(255, 255, 255, 0.4);
      color: var(--on-accent);
      width: 64px;
      height: 64px;
      --icon-size: 36px;
    }
    .alarm div {
      flex: 1;
      min-width: 240px;
    }
    .alarm h2 {
      margin-bottom: 4px;
    }
    .alarm p {
      margin: 0;
    }
    .alarm .btn {
      background: var(--forest);
      color: var(--white);
      --icon-size: 20px;
    }
    .alarm .btn:hover {
      background: var(--forest-2);
      color: var(--white);
    }

    .brands {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 12px;
    }
    .brands li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px;
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: 14px;
      font: 600 0.95rem var(--font-body);
      --icon-size: 22px;
    }
    .brands app-icon {
      color: var(--forest-2);
    }

    .rev {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    blockquote {
      margin: 0;
      padding: 24px;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 20px;
    }
    blockquote footer {
      color: var(--muted);
      font-size: 0.9rem;
    }
    .sample {
      margin-top: 20px;
      font-size: 0.85rem;
      color: var(--muted);
    }

    .two {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: clamp(28px, 5vw, 64px);
      align-items: start;
    }
    .acc {
      border-bottom: 1px solid var(--line);
    }
    .acc button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 18px 0;
      background: none;
      border: 0;
      font: 600 1.05rem var(--font-body);
      text-align: left;
      cursor: pointer;
      color: var(--ink);
      --icon-size: 22px;
    }
    .acc app-icon {
      color: var(--forest-2);
    }
    .acc p {
      color: var(--muted);
      margin: 0 0 18px;
    }
    .form-card {
      background: var(--mint);
      padding: 28px;
      border-radius: 24px;
      position: sticky;
      top: 110px;
    }

    @media (max-width: 960px) {
      .hero-in,
      .two,
      .shops {
        grid-template-columns: 1fr;
      }
      .steps {
        grid-template-columns: 1fr;
      }
      .steps li {
        display: grid;
        grid-template-columns: 48px 1fr;
        column-gap: 16px;
      }
      .steps li::after {
        display: none;
      }
      .num {
        grid-row: 1 / 3;
      }
      .form-card {
        position: static;
      }
      .art {
        order: -1;
        max-width: 520px;
      }
    }
  `,
})
export class Home {
  protected readonly c = COMPANY;
  protected readonly leads = inject(LeadService);
  protected readonly top = SERVICES.slice(0, 8);
  protected readonly problems = PROBLEMS;
  protected readonly benefits = BENEFITS;
  protected readonly shops = SHOPS;
  protected readonly steps = STEPS;
  protected readonly brands = BRANDS;
  protected readonly reviews = REVIEWS;
  protected readonly faq = FAQ;
  protected readonly openFaq = signal(0);
}
