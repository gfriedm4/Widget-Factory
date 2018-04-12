<?php

use Faker\Generator as Faker;

$factory->define(App\Order::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'address' => $faker->streetAddress
    ];
});
