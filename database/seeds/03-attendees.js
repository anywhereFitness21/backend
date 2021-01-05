exports.seed = function(knex) {
    // Inserts seed entries for 'attendees'
    return knex('attendees').insert([
      { user_id: 1, class_id: 1 },
      { user_id: 1, class_id: 2 },
      { user_id: 2, class_id: 1 },
      { user_id: 3, class_id: 2 },
      { user_id: 3, class_id: 3 },
      { user_id: 4, class_id: 1 },
      { user_id: 5, class_id: 3 },
      { user_id: 6, class_id: 2 },
      { user_id: 7, class_id: 1 },
      { user_id: 8, class_id: 3 }
    ]);
  };