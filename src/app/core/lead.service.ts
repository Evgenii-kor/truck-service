import { Injectable, signal } from '@angular/core';

export interface Lead {
  name: string;
  phone: string;
  service?: string;
  truck?: string;
  comment?: string;
}

export type LeadFormMode = 'callback' | 'booking';

/**
 * Хранит состояние модального окна и отправляет заявки.
 * Замените тело submit() на реальный запрос (HttpClient → ваш backend / CRM / Telegram-бот).
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  readonly modalOpen = signal(false);
  readonly mode = signal<LeadFormMode>('callback');
  readonly presetService = signal<string | null>(null);

  open(mode: LeadFormMode = 'callback', service: string | null = null): void {
    this.mode.set(mode);
    this.presetService.set(service);
    this.modalOpen.set(true);
  }

  close(): void {
    this.modalOpen.set(false);
  }

  submit(lead: Lead): Promise<void> {
    // TODO: заменить на реальную отправку.
    console.info('[lead]', lead);
    return new Promise((resolve) => setTimeout(resolve, 600));
  }
}
