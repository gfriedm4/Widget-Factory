<?php

namespace App\Http\Controllers;

use App\WidgetFinish;
use Illuminate\Http\Request;

class WidgetFinishController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WidgetFinish::query()->pluck('finish', 'id');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\WidgetFinish  $widgetFinish
     * @return \Illuminate\Http\Response
     */
    public function show(WidgetFinish $widgetFinish)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WidgetFinish  $widgetFinish
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WidgetFinish $widgetFinish)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WidgetFinish  $widgetFinish
     * @return \Illuminate\Http\Response
     */
    public function destroy(WidgetFinish $widgetFinish)
    {
        //
    }
}
