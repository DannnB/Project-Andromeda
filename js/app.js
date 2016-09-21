$(window).load(function () {
    console.log("Booking App Started");

    var consoleLine = "<p class=\"console-line\"></p>";

    console = {
        log: function (text) {
            $("#console-log").append($(consoleLine).html(text));
        }
    };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    
function bookingApp(){
    // if this dosen't pop up they we broke it somewhere out of this function most likely 
    console.log("Booking App func Started, don't let your dreams be dreams! Lets do stuff!");
    
    
    
    // Init datepicker
        // beforeDay: add booked day for current pod/pitches
    
    // on input select
        // get selectedDate store in var
            //
    
    // Check JSON 
    
    // update number of days aval
    
    //
}   
    
    // Make it standalone module
    bookingApp();
});