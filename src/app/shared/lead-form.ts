import { Component, inject, input, signal, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SERVICES } from '../core/data';
import { LeadService, LeadFormMode } from '../core/lead.service';

@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule],
  template: `
    @if (sent()) {
      <div class="done" role="status">
        <h3>Заявка принята</h3>
        <p>
          Перезвоним на {{ form.controls.phone.value }} в течение 10 минут в рабочее время (8:00–22:00).
        </p>
        <button type="button" class="btn btn--dark" (click)="reset()">Отправить ещё одну</button>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="field">
          <label [for]="id + 'name'">Ваше имя</label>
          <input
            [id]="id + 'name'"
            formControlName="name"
            autocomplete="name"
            [class.invalid]="bad('name')"
          />
          @if (bad('name')) {
            <span class="err">Укажите имя, чтобы мы знали, как к вам обращаться.</span>
          }
        </div>

        <div class="field">
          <label [for]="id + 'phone'">Телефон</label>
          <input
            [id]="id + 'phone'"
            formControlName="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            placeholder="+7 (___) ___-__-__"
            [class.invalid]="bad('phone')"
            (input)="mask($event)"
          />
          @if (bad('phone')) {
            <span class="err">Введите номер полностью: 11 цифр, начиная с +7.</span>
          }
        </div>

        @if (mode() === 'booking') {
          <div class="field">
            <label [for]="id + 'service'">Что нужно сделать</label>
            <select [id]="id + 'service'" formControlName="service">
              <option value="">Пока не знаю, нужна диагностика</option>
              @for (s of services; track s.slug) {
                <option [value]="s.title">{{ s.title }}</option>
              }
            </select>
          </div>
          <div class="field">
            <label [for]="id + 'truck'">Марка и модель</label>
            <input [id]="id + 'truck'" formControlName="truck" placeholder="Например, КАМАЗ 5490" />
          </div>
          <div class="field">
            <label [for]="id + 'comment'">Что случилось</label>
            <textarea [id]="id + 'comment'" formControlName="comment"></textarea>
          </div>
        }

        <label class="consent">
          <input type="checkbox" formControlName="consent" />
          <span>Согласен на обработку персональных данных</span>
        </label>
        @if (bad('consent')) {
          <span class="err consent-err">Без согласия мы не можем принять заявку.</span>
        }

        @if (failed()) {
          <p class="err" role="alert">
            Заявка не отправилась. Проверьте интернет и повторите или позвоните нам.
          </p>
        }

        <button class="btn btn--primary full" type="submit" [disabled]="busy()">
          {{ busy() ? 'Отправляем…' : mode() === 'booking' ? 'Записаться' : 'Перезвоните мне' }}
        </button>
      </form>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .full {
      width: 100%;
    }
    .consent {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      font-size: 0.92rem;
      margin: 4px 0 16px;
      cursor: pointer;
    }
    .consent input {
      width: 20px;
      height: 20px;
      margin-top: 2px;
      accent-color: var(--brand);
    }
    .err {
      color: #b3261e;
      font-size: 0.88rem;
    }
    .consent-err {
      display: block;
      margin: -8px 0 12px;
    }
    .done {
      padding: 8px 0;
    }
  `,
})
export class LeadForm {
  private readonly fb = inject(FormBuilder);
  private readonly leads = inject(LeadService);

  readonly mode = input<LeadFormMode>('callback');
  readonly preset = input<string | null>(null);
  readonly idPrefix = input('lf');

  protected readonly services = SERVICES;
  protected readonly busy = signal(false);
  protected readonly sent = signal(false);
  protected readonly failed = signal(false);
  protected readonly submitted = signal(false);
  protected get id(): string {
    return this.idPrefix() + '-';
  }

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
    service: [''],
    truck: [''],
    comment: [''],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    effect(() => {
      const p = this.preset();
      if (p) this.form.controls.service.setValue(p);
    });
  }

  protected bad(name: 'name' | 'phone' | 'consent'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  /** Маска +7 (999) 999-99-99 */
  protected mask(e: Event): void {
    const el = e.target as HTMLInputElement;
    let d = el.value.replace(/\D/g, '');
    if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1);
    d = d.slice(0, 10);
    let out = '';
    if (d.length) out = '+7 (' + d.slice(0, 3);
    if (d.length >= 3) out += ') ' + d.slice(3, 6);
    if (d.length >= 6) out += '-' + d.slice(6, 8);
    if (d.length >= 8) out += '-' + d.slice(8, 10);
    el.value = out;
    this.form.controls.phone.setValue(out);
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);
    this.failed.set(false);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    try {
      const { consent, ...lead } = this.form.getRawValue();
      void consent;
      await this.leads.submit(lead);
      this.sent.set(true);
    } catch {
      this.failed.set(true);
    } finally {
      this.busy.set(false);
    }
  }

  protected reset(): void {
    this.form.reset({ name: '', phone: '', service: this.preset() ?? '', truck: '', comment: '', consent: false });
    this.submitted.set(false);
    this.sent.set(false);
  }
}
