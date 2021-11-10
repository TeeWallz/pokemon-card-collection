
exports.up = function(knex) {
    return knex.schema.createTable('collections', function(table) {
        table.increments('id').primary().unsigned();
        table.string('name').notNullable();
        table.integer('creator')
            .unsigned()
            .index()
            .references('id')
            .inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('collections');
};
