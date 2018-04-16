<?php

namespace App;

class WidgetFinish extends WidgetModel
{
    protected $hidden = ['updated_at', 'created_at'];

    public function widgets() {
        return $this->hasMany('App\Widget');
    }
}
