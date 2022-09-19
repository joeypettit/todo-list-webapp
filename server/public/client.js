
// call onReady
$(onReady);

// set to id of row when edit button is pressed.
let nextEditId = 0;

// onReady function
function onReady(){
    

    

    console.log('js and jQ loaded');

    // load current list from server
    refreshList();

    // click handlers
    $('#todo-list').on('click', '.showNotesButton', (event)=> {
        $(event.target).parent().siblings('.collapsible').toggle();
    })
    // new task button handler, with toggle function
    $('#newButton').on('click', ()=>{
        $('#newTaskForm').toggle();
        $('#newButton').text( () => { 
            if($('#newButton').text() === 'New Task'){
                return 'Close';
            }else{
                return 'New Task'
            }
        });
    })
    // edit task button handler, with toggle function
    $('#todo-list').on('click', '.editButton', (event)=> {
        nextEditId = $(event.target).closest('li').data('taskid');
        $('#editTaskForm').toggle();
    })
    $('#updateTask').on('click', updateTask);

    // add button handler
    $('#addButton').on('click', addTask);
    // delete handler
    $('#todo-list').on('click', '.deleteButton', deleteTask)
    // checkbox (complete) handler
    $('#todo-list').on('click', '.completeCheck', completeToggle)
}


// refresh list
function refreshList(){
    
    $.ajax({
        method: 'GET',
        url: '/todo/',
    }).then((response) => {
        console.log('GET sucessful, incoming objects:', response);

        
        

        //empty list
        $('#todo-list').empty();
        
        //append list items
        for(let task of response){

            // convert due date to readable format
            let dueDate = task.due;
           





            $('#todo-list').append(`
                <li data-taskid="${task.id}">
                    <div class="taskRow"> 
                        <div class="checkbox-box">
                            ${(task.is_complete === true) ? `<input class="completeCheck" type="checkbox" name="checkbox-${task.id}" checked>` :`<input class="completeCheck" type="checkbox" name="checkbox-${task.id}"/>`}
                        </div>
                        <div class="task-info">
                            <div class="task" >
                                <div class="taskName">${task.task_name}</div>
                                <div class="dueDate">Due: ${task.due}</div>
                                <button class="showNotesButton">Notes</button>
                                <button class="editButton">Edit</button>
                                <button class="deleteButton">Delete</button>
                            </div>
                            <div class="collapsible hiddenFirst" >
                                <div class="dateCompleted">Completed: ${task.date_completed}</div>
                                <p class="notes">${task.notes}</p>
                            </div>
                        </div>
                    </div>
                </li>
            `)
        }
    })
}

// add task
function addTask(){
    // capture new task, store as object
    let newTask = {
        taskName: $('#taskIn').val(),
        isComplete: false,
        dateCompleted: null,
        dueDate: $('#dueIn').val(),
        notes: $('#notesIn').val()
    }

    // send ajax with new task object
    $.ajax({
        method: 'POST',
        url: '/todo/',
        data: newTask
    }).then( (response)=> {
        alert('Task Added!');

        //clear fields
        $('#taskIn').val('');
        $('#dueIn').val('');
        $('#notes').val('');
    }).catch((error) => {
        console.log(error);
    });
}

function deleteTask(event){
    // capture ID of task to be deleted
    let taskId = $(event.target).closest('li').data('taskid');
    
    // ajax DELETE request
    $.ajax({
        method: 'DELETE',
        url: `todo/${taskId}`
    }).then(() => {
        // refresh list
        refreshList();
    }).catch((error) =>{
        console.log('Error with DELETE', error);
    });
}

function completeToggle(event){
    // USE THIS TO CAPTURE TODAYS DATE YEAR-MONTH-DAY
    let dateCompleted = new Date().toISOString().slice(0, 10);
    // caputer task id
    let taskId = $(event.target).closest('li').data('taskid');
    // check if checkbox is checked or not 
    let isComplete = $(event.target).closest('.completeCheck').prop('checked');
    console.log("is checked?", isComplete);
    console.log('todays date and ID', dateCompleted, taskId);
    
    $.ajax({
        method: 'PUT',
        url: `/todo/toggleComplete/${taskId}`,
        data: {dateCompleted, isComplete}
    }).then( () => {
        // refresh list
        // isComplete ? $(event.target).parent().siblings('.task-info').removeClass('task-info').addClass('complete') : $(event.target).closest('.complete').removeClass('complete').addClass('task');
        refreshList();
        
    }).catch((error) =>{
        console.log('Error with toggle:', error);
    })
}

function updateTask(event){
    // store task id


    let editedTask = {
        taskName: $('#taskNameEdit').val(),
        dateCompleted: $('#dateCompleteEdit').val(),
        dueDate: $('#dueEdit').val(),
        notes: $('#notesEdit').val()
    }

    $.ajax({
        method: 'PUT',
        url: `/todo/${nextEditId}`,
        data: editedTask
    }).then( () => {
        // refresh list
        refreshList();
        $('#editTaskForm').toggle();
    }).catch((error) =>{
        console.log('Error with toggle:', error);
    })
    
     



}


