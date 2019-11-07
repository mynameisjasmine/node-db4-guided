exports.up = function(knex) {
    return knex.schema
      .createTable('species', tbl => {
        // the type of the Primary Key is: integer without negative values, also called unsigned
        tbl.increments();
        tbl.string('name', 255).notNullable();
      })
      .createTable('animals', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        // define our Foreign Key
        tbl
          .integer('species_id')
          .unsigned()
          .references('id')
          .inTable('species')
          .onDelete('RESTRICT') // about deleting the record from the primary key table. Could be 'RESTRICT', 'NO ACTION', 'SET NULL'
          .onUpdate('CASCADE'); // about changing the value of the primary key table.
        // we have bears and a few animals that are bears.
      })
      .createTable('zoos', tbl => {
        // the type of the Primary Key is: integer without negative values, also called unsigned
        tbl.increments();
        tbl.string('name', 255).notNullable();
      })
      .createTable('animal_zoo', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        tbl
          .integer('zoo_id')
          .unsigned()
          .references('id')
          .inTable('zoos')
          .onDelete('RESTRICT') 
          .onUpdate('CASCADE'); 
          tbl
          .integer('animal_id')
          .unsigned()
          .references('id')
          .inTable('animals')
          .onDelete('RESTRICT') 
          .onUpdate('CASCADE'); 
          tbl.date('from')
          tbl.date('to')
        
    })
    
  };
  exports.down = function(knex) {};
  // knex ... command no
  return knex.schema
  .dropTableIfExists('animal_zoos')
  .dropTableIfExists('zoos')
  .dropTableIfExists('animals')
  .dropTableIfExists('species')