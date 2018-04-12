<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    protected $fillable = [
        'name',
        'widget_type_id',
        'widget_finish_id',
        'widget_size_id',
        'price',
        'inventory',
    ];

    protected $hidden = [
        'widget_type_id',
        'widget_finish_id',
        'widget_size_id',
        'pivot',
        'created_at',
        'updated_at',
    ];

    protected $validations = [
        'name' => 'required|max:255',
        'widget_type_id' => 'required|exists:widget_types,id',
        'widget_size_id' => 'required|exists:widget_sizes,id',
        'widget_finish_id' => 'required|exists:widget_finishes,id',
        'price' => 'required|integer|min:0',
        'inventory' => 'required|integer|min:0',
    ];

    public function getValidations() {
        return $this->validations;
    }

    public function widgetType() {
        return $this->belongsTo('App\WidgetType');
    }

    public function widgetSize() {
        return $this->belongsTo('App\WidgetSize');
    }

    public function widgetFinish() {
        return $this->belongsTo('App\WidgetFinish');
    }
}
