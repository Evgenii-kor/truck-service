import { Component, inject } from '@angular/core';
import { BRANDS } from '../core/data';
import { LeadService } from '../core/lead.service';

@Component({
  selector: 'app-brands',
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>Марки техники</h1>
        <p>Тягачи, грузовики, прицепы и холодильные установки.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <p class="lede">
          Выполняем гарантийный и постгарантийный ремонт. Нет вашей марки в списке? Позвоните — часто
          работаем и с другой техникой.
        </p>
        <ul>
          @for (b of brands; track b) {
            <li>{{ b }}</li>
          }
        </ul>
        <button type="button" class="btn btn--dark" (click)="leads.open('booking')">
          Записать машину
        </button>
      </div>
    </section>
  `,
  styles: `
    ul {
      list-style: none;
      padding: 0;
      margin: 32px 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 1px;
      background: var(--line);
      border: 1px solid var(--line);
    }
    li {
      background: var(--white);
      padding: 28px 16px;
      font: 800 1.15rem var(--font-head);
      text-align: center;
    }
  `,
})
export class Brands {
  protected readonly brands = BRANDS;
  protected readonly leads = inject(LeadService);
}
