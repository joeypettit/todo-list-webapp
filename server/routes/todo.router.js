const { query } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Create GET endpoint to refresh DOM
router.get('/', (req, res) => {
    console.log('in GET endpoint');
    let queryText = `SELECT * FROM "tasks";`;

    // pool request
    pool.query(queryText).then((response) => {
        // assign response to variable and send to client
        let updatedList = response.rows;
        console.log('SELECT complete. Response:',updatedList);
        res.send(updatedList);
    }).catch((error) => {
        // catch error
        console.log('Error SELECTing from database', error);
        res.sendStatus(500);
    });
});//END router.get

// Create POST endpoint to create new task
router.post('/', (req, res) => {
    // send new task from client, save as variable
    // new task is an object {taskName, complete?, dueDate, dateCompleted, extraNotes}
    let {taskName, isComplete, dateCompleted, dueDate, notes} = req.body;
    console.log('in POST endpoint. Task to add is:', taskName, isComplete, dateCompleted, dueDate, notes);
    const queryText = ` INSERT INTO "tasks" ("task_name", "is_complete", "due", "date_completed","notes")
                                    VALUES	($1, $2, $3, $4, $5);`

    pool.query(queryText, [taskName, isComplete, dueDate, dateCompleted, notes])
    .then(() => {
        console.log('POST Successful');
        res.sendStatus(201);

    }).catch((error) => {
        console.log('Error in POST:', error);

    });
});

// Create DELETE endpoint to delete a task
router.delete('/:taskid', (req, res) => {
    // assign req.params. taskid to variable
    let toDeleteId = req.params.taskid;
    console.log('In DELETE. Task to be deleted:', toDeleteId);
    // query to send
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`

    pool.query(queryText, [toDeleteId])
    .then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('Error with DELETE', error);
        res.sendStatus(500);
    });
}); // END router.delete


// Create PUT endpoint to toggle is_complete
router.put('/toggleComplete/:taskid', (req, res) => {
     // assign req.params. taskid to variable
    let toToggleId = req.params.taskid;
    // assign date completed to variable
    let dateCompleted = req.body.dateCompleted;
    console.log('In PUT (toggle). Task to be toggled:', toToggleId,'Date:', dateCompleted);

    // capture current state of isComplete,
    // convert from string to boolean and toggle
    let isComplete = (req.body.isComplete === 'true');
    console.log('isComplete after toggle', isComplete);

    // if isComplete is false, set dateCompleted to NULL
    if(isComplete === false){
        dateCompleted = null;
    }

    // query to send
    let queryText = `UPDATE "tasks" SET "is_complete"= $2, "date_completed"=$3 WHERE "id"=$1;`;

    pool.query(queryText, [toToggleId, isComplete, dateCompleted])
    .then(() => {
        console.log('Toggle complete sucessful');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error with PUT(toggle)', error);
        res.sendStatus(500);
    });
}); // END router.put (toggle)


// Create PUT endpoint to edit existing task
// router.put('/:taskid', (req, res) => {
//     // assign req.params.taskid and payload to variables
//    let toToggleId = req.params.taskid;
//    let {taskName, isComplete, dateCompleted, dueDate, notes} = req.body;

//    console.log('In PUT (toggle). Task to be edited:', toToggleId);
//    // query to send, toggle of value happens in query command
//    let queryText = `UPDATE "tasks" SET "is_complete"= (NOT "is_complete") WHERE "id"=$1;`;

//    pool.query(queryText, [toToggleId])
//    .then(() => {
//        console.log('Toggle complete sucessful');
//        res.sendStatus(200);
//    }).catch((error) => {
//        console.log('Error with PUT(toggle)', error);
//        res.sendStatus(500);
//    });
// }); // end PUT (edit task)


module.exports = router;