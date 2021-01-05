const express = require('express');
const Classes = require('../classes/classModel');

const router = express.Router();

//getClasses --> get a list of all 'classes' --> from endpoint --> /api/classes
router.get('/', (req, res) => {
  Classes.getClasses()
    .then(activity => {
      console.log('inside getClasses', activity);
      res.status(200).json(activity);
    })
    .catch(error => {
      console.log('inside getClasses error', error);
      res.status(500).json({ message: 'No classes returned from the server', error });
    });
});

//getClassById --> gets a list a single 'class' by 'id' --> from endpoint --> /api/classes/:id
router.get('/:id', (req, res) => {
  const classId = req.params.id;

  Classes.getClassById(classId)
    .then(activity => {
      console.log('inside getClassById', activity);
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(401).json({ message: 'Class with that id not found' });
      }
    })
    .catch(error => {
      console.log('inside getClassById error', error);
      res.status(500).json({ message: 'Class with that id wasnt returned', error });
    });
});

// POST --> add a new class
router.post('/', (req, res) => {
  const newClass = req.body;

  Classes.addClass(newClass)
    .then(activity => {
      console.log('inside addClass activity', activity);
      if (activity) {
        res.status(200).json(activity);
      } else {
        res.status(401).json({ message: 'Sorry, you were unable to create a new class or activity' });
      }
    })
    .catch(error => {
      console.log('inside addClass error', error);
      res.status(500).json({ message: 'New class not created', error });
    });
});

//PUT Update Class

router.put('/:id', (req, res) => {
  Classes.updateClass(req.params.id, req.body)
    .then(item => {
      console.log(req.body)
      res.status(201).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error, something went wrong within server' });
    });
});

// DELET a Classs
router.delete('/:id', (req, res) => {
  const deletedID = req.params.id;
  Classes.deleteClass(deletedID)
    .then(result => {
      res.status(201).json(`class id ${deletedID} was deleted`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error, something went wrong within server' });
    });
});

// GET CLASSS BY USER ID
router.get('/:id/user_classes', (req, res) => {
  Classes.getClassByUserId(req.params.id)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error, something went wrong within server' });
    });
});

router.post('/user_classes', (req, res) => {
  Classes.addClassByUserId(req.params.id, req.body)
    .then(result => {
      res.status(201).json({ message: 'success' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error, something went wrong within server' });
    });
});
module.exports = router;