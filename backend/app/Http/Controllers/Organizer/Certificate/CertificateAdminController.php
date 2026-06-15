<?php

namespace App\Http\Controllers\Organizer\Certificate;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Registration;
use App\Services\Organizer\Certificate\CertificateAdminService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CertificateAdminController extends Controller
{
    public function __construct(protected CertificateAdminService $certificateAdminService)
    {
        
    }
    public function indexAdmin(Event $event)
    {
        Gate::authorize('view', $event);
        
        try {
            $result = $this->certificateAdminService->indexAdminCertificate($event);
            return $this->sendResponse($result, 'Certificados do evento listados com sucesso.');
        } catch (\Throwable $th) {
            return $this->sendError('Erro generico: ', [0 => $th->getMessage()]);
        }
    }

    public function generateParticipantCertificate(Registration $registration)
    {
        Gate::authorize('create', $registration);
        
        try {
            $result = $this->certificateAdminService->generateParticipantCertificate($registration);
            return $this->sendResponse($result, 'Certificado do participante foi gerado com sucesso.');
        } catch (\Throwable $th) {
            return $this->sendError('Erro generico: ', [0 => $th->getMessage()]);
        }
    }
}
