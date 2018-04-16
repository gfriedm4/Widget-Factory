<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(WidgetTypesTableSeeder::class);
        $this->call(WidgetSizesTableSeeder::class);
        $this->call(WidgetFinishesTableSeeder::class);
        $this->call(WidgetsTableSeeder::class);
//        $this->call(OrdersTableSeeder::class);
//        $this->call(OrderWidgetTableSeeder::class);
    }
}
