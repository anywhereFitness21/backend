exports.seed = function(knex) {
    // Inserts seed entries for 'classes'
    return knex('classes').insert([
        { className: 'yoga', class_duration: '35 minutes', classIntensityLevel: 'low', classCity: 'Arlington Heights', classDate: 'January 05, 2021', starTime: '8am' },
        
        { className: 'spin', classDuration: '1 hour', classIntensityLevel: 'high', classCity: 'Los Angeles', classDate: 'January 10, 2021', startTime: '10am' },
      
        { className: 'zumba', classDuration: '1.5 hours', classIntensityLevel: 'medium', classCity: 'Orlando', classDate: 'January 15, 2021', startTime: '12pm' },
      
        { className: 'boxing', classDuration: '1 hour', classIntensityLevel: 'medium', classCity: 'San Diego', classDate: 'January 20, 2021', startTime: '7am' },
      
        {className: 'hot yoga', classDuration: '45 minutes', classIntensityLevel: 'high', classCity: 'Hollywood', classDate: 'January 25, 2021', startTime: '5pm'
        },
      
        ]);
  };