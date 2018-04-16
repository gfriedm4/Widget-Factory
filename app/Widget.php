<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Widget extends Model
{
    use Sortable;

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

    public $sortable = [
        'name',
        'widget_type_id',
        'widget_finish_id',
        'widget_size_id',
        'price',
        'inventory',
        'created_at',
        'updated_at',
    ];

    public function price() {
        return $this->price / 100;
    }

    /**
     * @return array
     */
    public function getValidations() {
        return $this->validations;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function widgetType() {
        return $this->belongsTo('App\WidgetType');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function widgetSize() {
        return $this->belongsTo('App\WidgetSize');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function widgetFinish() {
        return $this->belongsTo('App\WidgetFinish');
    }

    /**
     * @param Builder $query
     * @param $direction
     * @return mixed
     */
    public function widgetTypeSortable($query, $direction) {
        return $query->join('widget_types', 'widgets.widget_type_id', '=', 'widget_types.id')
            ->orderBy('widget_types.type', $direction)
            ->select('widgets.*');
    }

    /**
     * @param Builder $query
     * @param $direction
     * @return mixed
     */
    public function widgetFinishSortable($query, $direction) {
        return $query->join('widget_finishes', 'widgets.widget_finish_id', '=', 'widget_finishes.id')
            ->orderBy('widget_finishes.finish', $direction)
            ->select('widgets.*');
    }

    /**
     * @param Builder $query
     * @param $direction
     * @return mixed
     */
    public function widgetSizeSortable($query, $direction) {
        return $query->join('widget_sizes', 'widgets.widget_size_id', '=', 'widget_sizes.id')
            ->orderBy('widget_sizes.value', $direction)
            ->select('widgets.*');
    }
}
