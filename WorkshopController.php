<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\WorkshopResource;
use App\Models\Workshop;
use Illuminate\Http\Request;

class WorkshopController extends Controller
{
    public function index()
    {
        return WorkshopResource::collection(Workshop::all());
    }

    public function show(Workshop $workshop)
    {
        return new WorkshopResource($workshop);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $data['user_id'] = $request->user()->id;

        return new WorkshopResource(Workshop::create($data));
    }

    public function update(Request $request, Workshop $workshop)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
        ]);

        $workshop->update($data);

        return new WorkshopResource($workshop);
    }

    public function destroy(Workshop $workshop)
    {
        $workshop->delete();
        return response()->noContent();
    }
}