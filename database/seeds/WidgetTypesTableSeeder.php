<?php

use Illuminate\Database\Seeder;
use \Webpatser\Uuid\Uuid;

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
                'id' => Uuid::generate()->string,
                'type' => $type,
                'created_at' => $time,
                'updated_at' => $time
            ]);
        }
    }
}
