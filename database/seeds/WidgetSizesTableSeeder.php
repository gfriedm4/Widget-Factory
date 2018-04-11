<?php

use Illuminate\Database\Seeder;

class WidgetSizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sizes = [
            -100 => 'Extremely Small',
            -50 => 'Small',
            0 => 'Medium',
            50 => 'Large',
            100 => 'Extremely Large'
        ];

        $time = Carbon\Carbon::now()->toDateTimeString();

        foreach ($sizes as $value => $size) {
            DB::table('widget_sizes')->insert([
                'size' => $size,
                'value' => $value,
                'created_at' => $time,
                'updated_at' => $time
            ]);
        }
    }
}
