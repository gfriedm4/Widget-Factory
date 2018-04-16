<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Order extends Model
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
        'widgets' => 'required|exists:widgets,id',
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
        return $this->belongsToMany('App\Widget')
            ->where('order_widget.quantity', '>', 0);
    }
}
