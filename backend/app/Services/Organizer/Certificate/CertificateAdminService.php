<?php

namespace App\Services\Organizer\Certificate;

use App\Models\Event;
use App\Models\Registration;
use App\Notifications\UserCertificatedByOrganizerNotification;
use Exception;
use Illuminate\Support\Str;


class CertificateAdminService
{
    public function indexAdminCertificate(Event $event)
    {
        $certificates = $event->certificates()->latest()->paginate(20);

        return $certificates;
    }

    public function generateParticipantCertificate(Registration $registration) 
    {
        $isCertificate = $registration->certificate;

        if ($isCertificate) {
            throw new Exception('Esse usuário já possui certificado desse evento.');
        }

        $event = $registration->event;

        $registration->certificate()->firstOrCreate(
                    ['registration_id' => $registration->id],
                    [
                        'validation_code' => Str::random(16),
                        'event_title_snapshot' => $event->name,
                        'event_start_date_snapshot' => $event->start_date_time->format('d/m/Y'),
                        'event_end_date_snapshot' => $event->end_date_time->format('d/m/Y'),
                        'event_hours_snapshot' => $event->hours,
                        'participant_name_snapshot' => $registration->user->name,
                        'issue_date' => now()
                    ]
                );

        $participant = $registration->user;

        $participant->notify(new UserCertificatedByOrganizerNotification($event));

        return $registration;
    }
}
        