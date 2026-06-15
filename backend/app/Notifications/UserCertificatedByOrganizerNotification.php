<?php

namespace App\Notifications;

use App\Models\Event;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserCertificatedByOrganizerNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(protected Event $event)
    {
        $this->event = $event;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Certificado do evento {$this->event->name} foi gerado")
            ->greeting("Olá, {$notifiable->name}")
            ->line('Seu certificado foi gerado com sucesso pelo organizador')
            ->line("Evento: {$this->event->name}")
            ->line("Data: {$this->event->start_date_time->format('d/m/Y')}")
            ->action('Ver Evento', url("/events/{$this->event->id}"))
            ->line('Obrigado por participar!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'event_id' => $this->event->id,
            'title' => 'Certificado gerado com sucesso',
            'message' => "Seu certificado no evento {$this->event->name} foi gerado pelo organizador",
            'type' => 'registration_created',
            'status' => 'sucess'
        ];
    }
}
