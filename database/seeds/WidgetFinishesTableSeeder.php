<?php

use Illuminate\Database\Seeder;
use Webpatser\Uuid\Uuid;

class WidgetFinishesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $finishes = [
            'Platinum',
            'Chrome',
            'Gold',
            'Silver',
            'Paint'
        ];

        $time = Carbon\Carbon::now()->toDateTimeString();

        foreach ($finishes as $finish) {
            DB::table('widget_finishes')->insert([
                'id' => Uuid::generate()->string,
                'finish' => $finish,
                'created_at' => $time,
                'updated_at' => $time
            ]);
        }
    }
}
