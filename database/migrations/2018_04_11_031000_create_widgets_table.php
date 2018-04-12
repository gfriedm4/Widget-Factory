<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWidgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('widgets', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name");
            $table->unsignedInteger('widget_type_id');
            $table->foreign('widget_type_id')->references('id')->on('widget_types');
            $table->unsignedInteger('widget_finish_id');
            $table->foreign('widget_finish_id')->references('id')->on('widget_finishes');
            $table->unsignedInteger('widget_size_id');
            $table->foreign('widget_size_id')->references('id')->on('widget_sizes');
            $table->integer('price');
            $table->integer('inventory');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('widgets');
        Schema::enableForeignKeyConstraints();
    }
}
