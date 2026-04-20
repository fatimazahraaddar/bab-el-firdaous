<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolClass;

class ClassController extends Controller
{
    // 📥 GET /api/classes
    public function index()
    {
        return response()->json(SchoolClass::all());
    }

    // 📥 GET /api/classes/{id}
    public function show($id)
    {
        $class = SchoolClass::find($id);

        if (!$class) {
            return response()->json([
                'message' => 'Classe non trouvée'
            ], 404);
        }

        return response()->json($class);
    }

    // ➕ POST /api/classes
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'nullable|string|max:255',
        ]);

        $class = SchoolClass::create($validated);

        return response()->json([
            'message' => 'Classe créée avec succès',
            'data' => $class
        ], 201);
    }

    // ✏️ PUT /api/classes/{id}
    public function update(Request $request, $id)
    {
        $class = SchoolClass::find($id);

        if (!$class) {
            return response()->json([
                'message' => 'Classe non trouvée'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'level' => 'nullable|string|max:255',
        ]);

        $class->update($validated);

        return response()->json([
            'message' => 'Classe mise à jour',
            'data' => $class
        ]);
    }

    // 🗑 DELETE /api/classes/{id}
    public function destroy($id)
    {
        $class = SchoolClass::find($id);

        if (!$class) {
            return response()->json([
                'message' => 'Classe non trouvée'
            ], 404);
        }

        $class->delete();

        return response()->json([
            'message' => 'Classe supprimée'
        ]);
    }
}