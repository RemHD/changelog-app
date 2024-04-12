exports.up = function (knex) {
  return knex.schema.table('changelogs', function (table) {
    table.string('app_name').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.table('changelogs', function (table) {
    table.dropColumn('app_name')
  })
}
