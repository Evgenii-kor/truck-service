import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../core/data';
import { Icon } from '../shared/icon';

type Group = 'all' | 'repair' | 'body' | 'other';

@Component({
  selector: 'app-services',
  imports: [RouterLink, Icon],
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>Услуги</h1>
        <p>Цена «от» — для ориентира. Точную смету назовём после осмотра.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="tabs" role="group" aria-label="Фильтр услуг">
          @for (t of tabs; track t.id) {
            <button type="button" [attr.aria-pressed]="group() === t.id" (click)="group.set(t.id)">
              {{ t.label }}
            </button>
          }
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Услуга</th>
              <th scope="col" class="hide-s">Срок</th>
              <th scope="col" class="r">Цена</th>
            </tr>
          </thead>
          <tbody>
            @for (s of list(); track s.slug) {
              <tr>
                <td class="main">
                  <span class="ico"><app-icon [name]="s.icon" /></span>
                  <span class="t">
                    <a [routerLink]="['/services', s.slug]">{{ s.title }}</a>
                    <small>{{ s.short }}</small>
                  </span>
                </td>
                <td class="hide-s">{{ s.duration }}</td>
                <td class="r">{{ s.from ? 'от ' + s.from.toLocaleString('ru') + ' ₽' : 'по смете' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: `
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }
    .tabs button {
      min-height: 44px;
      padding: 0 18px;
      border: 2px solid var(--forest);
      background: transparent;
      border-radius: 999px;
      font: 600 0.95rem var(--font-body);
      cursor: pointer;
      color: var(--ink);
    }
    .tabs button[aria-pressed='true'] {
      background: var(--forest);
      color: var(--white);
    }
    .ico {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: var(--mint);
      color: var(--forest);
      flex: none;
      --icon-size: 26px;
    }
    .main {
      display: flex;
      gap: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--white);
      border-radius: 16px;
      overflow: hidden;
    }
    th {
      text-align: left;
      font-size: 0.85rem;
      color: var(--muted);
      padding: 12px 16px;
      border-bottom: 2px solid var(--forest);
    }
    td {
      padding: 18px 16px;
      border-bottom: 1px solid var(--line);
      vertical-align: top;
    }
    td a {
      font: 600 1.02rem var(--font-head);
      color: var(--ink);
      text-decoration-color: var(--accent);
      text-decoration-thickness: 3px;
    }
    td small {
      display: block;
      color: var(--muted);
      margin-top: 4px;
    }
    .r {
      text-align: right;
      white-space: nowrap;
      font-weight: 600;
    }
    @media (max-width: 640px) {
      .hide-s {
        display: none;
      }
    }
  `,
})
export class Services {
  protected readonly tabs: { id: Group; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'repair', label: 'Ремонт и ТО' },
    { id: 'body', label: 'Кузов' },
    { id: 'other', label: 'Прочее' },
  ];
  protected readonly group = signal<Group>('all');
  protected readonly list = computed(() =>
    this.group() === 'all' ? SERVICES : SERVICES.filter((s) => s.group === this.group()),
  );
}
