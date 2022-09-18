// call onReady
$(onReady);

// onReady function
function onReady(){
    // load bootstrap

    console.log('js and jQ loaded');

    // click handlers
    $('.task').on('click', toggleCollapse);

   // load current list from server

    //

}

function toggleCollapse(event){
    // store task id as variable
    let taskId = $(event.target).closest('li').data('taskid');

    // toggle visibility of notes when button clicked
    $(event.target).parent().siblings('.collapsible').toggle();
    




}



// USE THIS TO CAPTURE TODAYS DATE YEAR-MONTH-DAY
// let today = new Date().toISOString().slice(0, 10)