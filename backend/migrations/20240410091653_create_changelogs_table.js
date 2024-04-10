exports.up = function (knex) {
  return knex.schema.createTable('changelogs', (table) => {
    table.increments('id')
    table.string('title')
    table.text('content')
    table.string('category')
    table.date('date')
    table.boolean('is_hidden').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('changelogs')
}
