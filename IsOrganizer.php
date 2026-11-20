<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsOrganizer
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
         public function handle(Request $request, Closure $next): Response
        {
            if ($request->user()->role !== 'organizer') {
            return response()->json(['message' => 'Forbidden'], 403);
    }
    return $next($request);
 } 
}
