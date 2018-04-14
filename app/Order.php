<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name',
        'address',
        'email',
    ];

    protected $validations = [
        'name' => 'required|max:255',
        'address' => 'required|max:255',
        'email' => 'required|email',
        'widgets' => 'required|exists:widgets,id',
    ];

    public function getValidations() {
        return $this->validations;
    }

    public function widgets() {
        return $this->belongsToMany('App\Widget')
            ->where('order_widget.quantity', '>', 0);
    }
}
