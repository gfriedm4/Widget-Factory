<?php

use Faker\Generator as Faker;

$factory->define(App\Widget::class, function (Faker $faker) {
    $widgetType = App\WidgetType::query()->inRandomOrder()->limit(1)->first();
    $widgetSize = App\WidgetSize::query()->inRandomOrder()->limit(1)->first();
    $widgetFinish = App\WidgetFinish::query()->inRandomOrder()->limit(1)->first();

    return [
        'name' => "Product " . rand(1, 500),
        'widget_types_id' => $widgetType->id,
        'widget_sizes_id' => $widgetSize->id,
        'widget_finishes_id' => $widgetFinish->id,
        'price' => rand(1, 5000) * 100,
        'inventory' => rand(0, 3)
    ];
});
