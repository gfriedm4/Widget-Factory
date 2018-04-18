# Widget Factory

A web backend and frontend for an arbitrary widget factory.

### Prerequisites

```
Composer 1.6.3 (https://getcomposer.org)
Yarn 1.5.1 (https://yarnpkg.com/) or Node.js 8.10.0 (https://nodejs.org)
PHP 7.1.3
```

### Installing

Clone repository with:

```
git clone https://github.com/Gfriedman21/Widget-Factory.git
```
Install composer dependencies by running:
```
composer install
```

Install node dependencies by running:
```
yarn
```

Create database tables by running:
```
php artisan migrate
```

## Deployment

Project can be built with yarn. Building process uses webpack in the background.
```
yarn production
```

## Database Seeding

Database can be filled with test data using the following command
```
php artisan db:seed
```

## Built With

* [Laravel](https://laravel.com/) - The web framework used
* [React](https://reactjs.org/) - Front end library used

## Back End Goals
1.  [x] Create a relational database (schema and data) to store Widget inventory and orders. 
2.  [x] Implement a server that will retrieve data from that schema. At a minimum, offer the
following functionality:
    1. [x] Select Widgets by category.
		2. [x] Search Widgets by size or finish.
		3. [x] Create an order.
		4. [x] Add a Widget to, or remove a Widget from, an order.
		5. [x] Delete an order entirely.
		6. [x] Edit the available quantity of a Widget.
		7. [x] Add new Widgets (eg, making Widget Extreme Edition available in Medium size,
Gold finish).
3. [x] Protect against SQL Injection and Cross-Site Scripting attacks.

## Secondary Back End Goals
1. Create an asynchronous backend.
2. [x] Performance or scalability optimizations.
3. [x] Create a RESTful API.
4. Hierarchical Widget category support.
5. [x] Add sorting and pagination options to Widget search.
6. Offer endpoints for editing Widget attributes (adding a new color, or size, option)
7. Offer endpoints for adding new Widget attributes (adding scent, or haunted, as an
option)
8. Endpoints for adding new categories.

## Front End Goals
1. [x] A customer should be able to browse Widgets by category.
2. [x] A customer should be able to search Widgets by size or finish.
3. [x] A customer should be able to add a Widget to their order.
4. [x] A customer should be able to view their order, remove things from it, or delete the order
entirely.
5. A page should be available where Widget quantities can be edited.
6. [x] A page should be available to add new Widgets (eg, making Widget Extreme Edition
available in Medium size, Gold finish).

## Secondary Front End Goals
1. Hierarchical category structure.
2. Support additional values for existing Widget properties (eg, add a new color or size).
