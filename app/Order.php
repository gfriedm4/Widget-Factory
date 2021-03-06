<?php

namespace App;

use Kyslik\ColumnSortable\Sortable;

class Order extends WidgetModel
{
    use Sortable;

    protected $fillable = [
        'name',
        'address',
        'email',
    ];

    protected $validations = [
        'name' => 'required|max:255',
        'address' => 'required|max:255',
        'email' => 'required|email',
        'widgets' => 'required',
    ];

    public $sortable = [
        'name',
        'address',
        'email',
        'created_at',
        'updated_at',
    ];

    public function getValidations() {
        return $this->validations;
    }

    public function widgets() {
        return $this->belongsToMany('App\Widget')->withPivot('quantity');
    }
}
