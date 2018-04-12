<?php

use Illuminate\Database\Seeder;
use \App\Order;
class OrderWidgetTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $time = Carbon\Carbon::now()->toDateTimeString();
        $widgetIds = \App\Widget::query()->pluck('id')->toArray();
        Order::query()->chunk(25, function($orders) use ($time, $widgetIds){
            foreach ($orders as $order) {
                DB::table('order_widget')->insert([
                    'order_id' => $order->id,
                    'widget_id' => array_random($widgetIds),
                    'quantity' => rand(1,3),
                    'created_at' => $time,
                    'updated_at' => $time
                ]);
            }
        });

    }
}
