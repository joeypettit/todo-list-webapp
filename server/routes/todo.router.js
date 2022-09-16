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
    })


});//END router.get

// Create POST endpoint to create new task

// Create DELETE endpoint to delete a task

// Create PUT endpoint to toggle is_complete

// Create PUT endpoint to edit existing task

module.exports = router;