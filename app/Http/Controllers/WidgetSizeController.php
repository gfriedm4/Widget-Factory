<?php

namespace App\Http\Controllers;

use App\WidgetSize;
use Illuminate\Http\Request;

class WidgetSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WidgetSize::query()->pluck('size', 'id');
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
     * @param  \App\WidgetSize  $widgetSize
     * @return \Illuminate\Http\Response
     */
    public function show(WidgetSize $widgetSize)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WidgetSize  $widgetSize
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WidgetSize $widgetSize)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WidgetSize  $widgetSize
     * @return \Illuminate\Http\Response
     */
    public function destroy(WidgetSize $widgetSize)
    {
        //
    }
}
