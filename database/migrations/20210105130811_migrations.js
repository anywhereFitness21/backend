exports.up = function(knex) {
    
    return (
      knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 255).notNullable().unique();
            tbl.string('email', 255).notNullable().unique();
            tbl.string('password', 255).notNullable();
            tbl.string('role').notNullable();
            tbl.timestamps(true, true);
        }) 
            
        .createTable('classes', tbl => {
          tbl.increments();
          tbl.string('className', 255).notNullable();
          tbl.string('classDuration', 255).notNullable();
          tbl.string('classIntensityLevel', 25).notNullable();
          tbl.string('classCity', 75).notNullable();
          tbl.date('classDate');
          tbl.string('startTime');
          tbl.datetime('classTimezone');
        })
  
        .createTable('attendees', tbl => {
          tbl.increments();
          tbl.integer('user_id') .references('id')
            .inTable('users').unsigned().notNullable()
            .onUpdate('CASCADE').onDelete('CASCADE');
          tbl.integer('class_id').references('id')
            .inTable('classes').unsigned().notNullable()
            .onUpdate('CASCADE').onDelete('CASCADE');
        })
    );
  };
  
  exports.down = function(knex) {
    
    return knex.schema
      .dropTableIfExists('attendees')
      .dropTableIfExists('classes')
      .dropTableIfExists('users');
  };