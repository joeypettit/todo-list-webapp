
// call onReady
$(onReady);

// onReady function
function onReady(){

    console.log('js and jQ loaded');

    // click handlers
    $('#todo-list').on('click', toggleCollapse)

   // load current list from server
   refreshList();

    // 

}

function toggleCollapse(event){
    // store task id as variable
    let taskId = $(event.target).closest('li').data('taskid');

    // toggle visibility of notes/date completed when button clicked
    $(event.target).parent().siblings('.collapsible').toggle();
    
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
            console.log('iscomplete is:, ', task.is_complete);
            $('#todo-list').append(`
                <li data-taskid="${task.id}">
                    <div class="checkbox-box">
                        ${(task.is_complete === true) ? `<input type="checkbox" name="checkbox-${task.id}" checked>` :`<input type="checkbox" name="checkbox-${task.id}"/>`}
                    </div>
                    <div class="task-info">
                        <div class="task" >
                            <span class="taskName">${task.task_name}</span>
                            <span class="dueDate">Due: ${task.due}</span>
                        </div>
                        <div class="collapsible">
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





}


// USE THIS TO CAPTURE TODAYS DATE YEAR-MONTH-DAY
// let today = new Date().toISOString().slice(0, 10)