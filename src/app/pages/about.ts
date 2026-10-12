import { Component } from '@angular/core';
import { COMPANY } from '../core/data';

@Component({
  selector: 'app-about',
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>О компании</h1>
        <p>Работаем с {{ c.founded }} года. {{ c.posts }} постов, три собственных цеха.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap cols">
        <div>
          <h2>Чем мы отличаемся</h2>
          <p>
            Мы делаем ремонт понятным: до начала работ вы видите смету, в ходе ремонта получаете фото, а
            при выдаче — заказ-наряд с гарантией и замененные детали.
          </p>
          <p>
            Замените этот текст рассказом о вашей компании: история, оборудование, команда,
            сертификаты и партнёрства с производителями.
          </p>
        </div>
        <dl>
          <div><dt>Основана</dt><dd>{{ c.founded }}</dd></div>
          <div><dt>Постов</dt><dd>{{ c.posts }}</dd></div>
          <div><dt>Режим</dt><dd>{{ c.hours }}</dd></div>
          <div><dt>Приём с грузом</dt><dd>круглосуточно</dd></div>
        </dl>
      </div>
    </section>
    <section class="section section--white">
      <div class="wrap">
        <h2>Документы и реквизиты</h2>
        <p class="lede">
          Здесь разместите свидетельства, сертификаты дилера и реквизиты: ИНН, КПП, ОГРН, банковские данные.
        </p>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: clamp(28px, 5vw, 64px);
    }
    dl {
      margin: 0;
      border-top: 3px solid var(--forest);
    }
    dl div {
      padding: 14px 0;
      border-bottom: 1px solid var(--line);
    }
    dt {
      font-size: 0.85rem;
      color: var(--muted);
    }
    dd {
      margin: 0;
      font: 700 1.3rem var(--font-head);
    }
    @media (max-width: 800px) {
      .cols {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class About {
  protected readonly c = COMPANY;
}
