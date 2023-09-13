$(document).ready(function () {

    // Event handler for save buttons
    $(".saveButton").on("click", function(){
        console.log(`it saved`);

        // Get the ID of the parent time-block and the description value
        let timeID = $(this).parent().attr("id");
        let value = $(this).siblings(".description").val();

        console.log(timeID);
        console.log(value);

        // Store the description in local storage
        localStorage.setItem(timeID, value);

        // Show a notification for 5 seconds
        $(".notification").addClass(`show`);

        setTimeout(function(){
            $(".notification").removeClass("show");
        }, 5000)
    })

     // Function to update time-block styles based on the current hour
    function hourUpdate() {
        let currentHour = dayjs().hour();
    
        $(".time-block").each(function () {
            let hour = parseInt($(this).attr("id").split("-")[1]);
    
            if (hour < currentHour) {
                $(this).addClass("past").removeClass("present future");
            } else if (hour === currentHour) {
                $(this).addClass("present").removeClass("past future");
            } else {
                $(this).addClass("future").removeClass("past present");
            }
        });
    
    }

    // Initial call to hourUpdate to set styles
    hourUpdate();

    $(document).ready(function () {
    
        // Use a loop to set values for description inputs based on IDs
        for (let i = 5; i <= 24; i++) {
            $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`));
        }
        
        $("#currentDay").text(dayjs().format("dddd, MMMM, D"));
    
    });
    
    // Display the current day in the designated element
    $("#currentDay").text(dayjs().format("dddd, MMMM, D"));

    // Function to update the current time every second
    function updateTime() {
        var currentTime = dayjs().format('HH:mm:ss');

        // Display the current time in the HTML element
        $('#currentTime').text(currentTime);
    }

    // Call updateTime immediately and then every second (1000 milliseconds)
    updateTime(); 
    setInterval(updateTime, 1000);
});