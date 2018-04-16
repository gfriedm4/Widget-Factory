<?php

namespace App;

class WidgetSize extends WidgetModel
{
    protected $hidden = ['updated_at', 'created_at'];

    public function widgets() {
        return $this->hasMany('App\Widget');
    }
}
