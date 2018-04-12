<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WidgetSize extends Model
{
    protected $hidden = ['updated_at', 'created_at'];

    public function widgets() {
        return $this->hasMany('App\Widget');
    }
}
