<?php

use Illuminate\Database\Seeder;

class WidgetTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            'Prime',
            'Elite',
            'Extreme',
            'Super',
            'Premium'
        ];

        $time = Carbon\Carbon::now()->toDateTimeString();

        foreach ($types as $type) {
            DB::table('widget_types')->insert([
                'type' => $type,
                'created_at' => $time,
                'updated_at' => $time
            ]);
        }
    }
}
