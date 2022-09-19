
// call onReady
$(onReady);

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
    // add button handler
    $('#addButton').on('click', addTask);
    // delete handler
    $('#todo-list').on('click', '.deleteButton', deleteTask)
    // checkbox (complete) handler
    $('#todo-list').on('click', '.completeCheck', completeToggle)
}

    // store task id as variable
    // let taskId = $(event.target).closest('li').data('taskid');


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
            console.log('iscomplete is:, ', task.is_complete);
            $('#todo-list').append(`
                <li data-taskid="${task.id}">
                    <div class="checkbox-box">
                        ${(task.is_complete === true) ? `<input class="completeCheck" type="checkbox" name="checkbox-${task.id}" checked>` :`<input class="completeCheck" type="checkbox" name="checkbox-${task.id}"/>`}
                    </div>
                    <div class="task-info">
                        <div class="task" >
                            <span class="taskName">${task.task_name}</span>
                            <span class="dueDate">Due: ${task.due}</span>
                            <button class="showNotesButton">Notes</button>
                            <button class="editButton">Edit</button>
                            <button class="deleteButton">Delete</button>
                        </div>
                        <div class="collapsible hiddenFirst" >
                            <div class="dateCompleted">Completed: ${task.date_completed}</div>
                            <p class="notes">${task.notes}</p>
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

function completeToggle(){
    // USE THIS TO CAPTURE TODAYS DATE YEAR-MONTH-DAY
    let today = new Date().toISOString().slice(0, 10)
    let taskId = $(event.target).closest('li').data('taskid');

    console.log('todays date and ID', today, taskId);
    
    $.ajax({
        method: 'PUT',
        url: '/toggleComplete/'
    })



}


