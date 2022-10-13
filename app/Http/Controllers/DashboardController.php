<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\News;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $posts = Posts::count();
        $news = News::count();
        return response()->json(compact('posts','news'));
    }
}
