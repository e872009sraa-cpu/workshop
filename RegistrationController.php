<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegistrationResource;
use App\Models\Registration;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RegistrationController extends Controller
{
 
    public function index(Request $request)
    {
        return RegistrationResource::collection(
            $request->user()->registrations()->with('workshop')->get()
        );
    }

  
    public function store(Request $request, Workshop $workshop)
    {
        $registration = Registration::create([
            'user_id' => $request->user()->id,
            'workshop_id' => $workshop->id,
        ]);

        return new RegistrationResource($registration->load('workshop'));
    }

  
    public function destroy(Registration $registration)
    {
        Gate::authorize('cancel-registration', $registration); 
        $registration->delete();
        return response()->noContent();
    }
}