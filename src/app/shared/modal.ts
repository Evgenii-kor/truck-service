import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { LeadService } from '../core/lead.service';
import { LeadForm } from './lead-form';

@Component({
  selector: 'app-modal',
  imports: [LeadForm],
  template: `
    <dialog #dlg (close)="leads.close()" (click)="backdrop($event)" aria-labelledby="modal-title">
      <div class="box">
        <button type="button" class="x" (click)="leads.close()" aria-label="Закрыть">✕</button>
        <h2 id="modal-title">
          {{ leads.mode() === 'booking' ? 'Запись на ремонт или ТО' : 'Заказать звонок' }}
        </h2>
        <p class="sub">
          {{
            leads.mode() === 'booking'
              ? 'Оставьте данные — подберём время и назовём срок.'
              : 'Перезвоним в течение 10 минут и ответим на вопросы.'
          }}
        </p>
        @if (leads.modalOpen()) {
          <app-lead-form [mode]="leads.mode()" [preset]="leads.presetService()" idPrefix="modal" />
        }
      </div>
    </dialog>
  `,
  styles: `
    dialog {
      border: 0;
      padding: 0;
      border-radius: 24px;
      width: min(480px, calc(100% - 24px));
      max-height: calc(100dvh - 24px);
      overflow: auto;
      background: var(--white);
      color: var(--ink);
    }
    dialog::backdrop {
      background: rgba(10, 16, 18, 0.65);
    }
    .box {
      padding: 28px 28px 24px;
      position: relative;
    }
    h2 {
      font-size: 1.5rem;
      padding-right: 36px;
    }
    .sub {
      color: var(--muted);
    }
    .x {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 40px;
      height: 40px;
      border: 0;
      background: var(--mint);
      border-radius: 50%;
      font-size: 1rem;
      cursor: pointer;
    }
  `,
})
export class Modal {
  protected readonly leads = inject(LeadService);
  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    effect(() => {
      const el = this.dlg().nativeElement;
      if (this.leads.modalOpen()) {
        if (!el.open) el.showModal();
      } else if (el.open) {
        el.close();
      }
    });
  }

  protected backdrop(e: MouseEvent): void {
    if (e.target === this.dlg().nativeElement) this.leads.close();
  }
}
