
// call onReady
$(onReady);

// onReady function
function onReady(){

    console.log('js and jQ loaded');

    // click handlers
    $('.task').on('click', toggleCollapse);

   // load current list from server
   refreshList();

    //

}

function toggleCollapse(event){
    // store task id as variable
    let taskId = $(event.target).closest('li').data('taskid');

    // toggle visibility of notes when button clicked
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
                    <div>
                        <label for="checkbox-${task.id}>Complete:</label>
                        ${(task.is_complete === true) ? `<input type="checkbox" name="checkbox-${task.id}" checked>` :`<input type="checkbox" name="checkbox-${task.id}"/>`}
                    </div>
                    <div class="task" >
                        <span class="taskName">${task.task_name}</span>
                        <span class="dueDate">DUE DATE</span>
                    </div>
                    <div class="collapsible">
                        <div class="dateCompleted">Completed: blah-blah-blah</div>
                        <p class="notes">These are the notes</p>
                    </div>

                </li>
            `)
        }

    })


}


// USE THIS TO CAPTURE TODAYS DATE YEAR-MONTH-DAY
// let today = new Date().toISOString().slice(0, 10)