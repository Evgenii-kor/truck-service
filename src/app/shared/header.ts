import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { COMPANY } from '../core/data';
import { LeadService } from '../core/lead.service';
import { Icon } from './icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <div class="top">
      <div class="wrap top-in">
        <span>{{ c.hours }}. {{ c.hoursNote }}</span>
        <span class="addr">{{ c.address }}</span>
      </div>
    </div>
    <header class="bar">
      <div class="wrap bar-in">
        <a routerLink="/" class="logo" (click)="open.set(false)" aria-label="{{ c.name }} — на главную">
          <svg class="mark" width="36" height="36" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#0d4a3a" />
            <path d="M7 23V9l9 9 9-9v14" fill="none" stroke="#ff7a1a" stroke-width="3.5" stroke-linejoin="round" />
          </svg>
          <span>
            <b>{{ c.name }}</b>
            <small>{{ c.tagline }}</small>
          </span>
        </a>

        <button
          type="button"
          class="burger"
          [attr.aria-expanded]="open()"
          aria-controls="main-nav"
          (click)="open.set(!open())"
        >
          {{ open() ? 'Закрыть' : 'Меню' }}
        </button>

        <nav id="main-nav" [class.open]="open()" aria-label="Основное меню">
          <a routerLink="/services" routerLinkActive="on" (click)="open.set(false)">Услуги</a>
          <a routerLink="/brands" routerLinkActive="on" (click)="open.set(false)">Марки</a>
          <a routerLink="/about" routerLinkActive="on" (click)="open.set(false)">О компании</a>
          <a routerLink="/reviews" routerLinkActive="on" (click)="open.set(false)">Отзывы</a>
          <a routerLink="/news" routerLinkActive="on" (click)="open.set(false)">Новости</a>
          <a routerLink="/contacts" routerLinkActive="on" (click)="open.set(false)">Контакты</a>
        </nav>

        <div class="act">
          <a class="tel" [href]="'tel:' + c.phoneHref"><app-icon name="phone" />{{ c.phone }}</a>
          <button type="button" class="btn btn--primary" (click)="leads.open('booking')">
            Записаться
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .top {
      background: var(--forest);
      color: #bcd9cc;
      font-size: 0.85rem;
    }
    .top-in {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding-block: 7px;
    }
    .bar {
      background: var(--white);
      border-bottom: 1px solid var(--line);
    }
    .bar-in {
      display: flex;
      align-items: center;
      gap: 24px;
      min-height: 72px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--ink);
      line-height: 1.1;
    }
    .mark {
      flex: none;
    }
    .logo b {
      display: block;
      font: 800 1.15rem var(--font-head);
      letter-spacing: -0.01em;
    }
    .logo small {
      color: var(--muted);
      font-size: 0.78rem;
    }
    nav {
      display: flex;
      gap: 4px;
      margin-left: auto;
    }
    nav a {
      padding: 10px 12px;
      border-radius: 999px;
      text-decoration: none;
      color: var(--ink);
      font-weight: 500;
      white-space: nowrap;
    }
    nav a:hover {
      background: var(--mint);
    }
    nav a.on {
      background: var(--mint);
      color: var(--forest);
    }
    .act {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .tel {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font: 600 0.95rem var(--font-head);
      color: var(--forest);
      text-decoration: none;
      white-space: nowrap;
      --icon-size: 20px;
    }
    .burger {
      display: none;
      margin-left: auto;
      min-height: 44px;
      padding: 0 16px;
      border: 2px solid var(--ink);
      background: transparent;
      border-radius: var(--radius);
      font: 600 0.95rem var(--font-body);
      cursor: pointer;
    }
    @media (max-width: 1180px) {
      .tel {
        font-size: 0.95rem;
      }
    }
    @media (max-width: 1080px) {
      .act .btn {
        display: none;
      }
    }
    @media (max-width: 900px) {
      .burger {
        display: block;
      }
      .addr {
        display: none;
      }
      .top-in {
        justify-content: center;
      }
      .act {
        display: none;
      }
      nav {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        flex-direction: column;
        background: var(--white);
        padding: 8px var(--gut) 16px;
        border-bottom: 1px solid var(--line);
        margin: 0;
      }
      nav.open {
        display: flex;
      }
      nav a {
        padding: 14px 4px;
        font-size: 1.1rem;
        border-bottom: 1px solid var(--mint);
      }
    }
  `,
})
export class Header {
  protected readonly c = COMPANY;
  protected readonly leads = inject(LeadService);
  protected readonly open = signal(false);
}
