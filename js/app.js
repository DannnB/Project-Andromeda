"use strict";
$(window).load(function () {
    console.log("Booking App Started on window load");

    function inlineConsole() {
        var consoleLine = "<p class=\"console-line\"></p>";

        console = {
            log: function (text) {
                $("#console-log").append($(consoleLine).html(text));
            }
        };
    }
    // inlineConsole(); // uncomment to get inline console
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    function bookingApp() {
        // if this dosen't pop up they we broke it somewhere out of this function most likely 
        console.log("Booking App func Started, don't let your dreams be dreams!");
        // get json
        var userDate = "09/05/2017"; // get user date, string for testing
        $("#giveMeData").click(function () {
            // onSelected methord will run this fuction
            getDataJSON(userDate);
        });

        function setSelectedDate(getUserDate, getMaxDays) {
            $("#arr-date-set").text("Arriving on the " + getUserDate);
            $("#your-max-days").text("You can stay for a maximum of "+getMaxDays+" days. If you would like more days please select a date before the current one.");
        }

        function setSelectedNumDays(numDay) {
            $(".num-days").val(numDay);
        }

        function getClikedDays() {
            $(".aval-days").click(function () {
                console.log(event.target.id);
                var clickedDay = event.target.id;
                setSelectedNumDays(clickedDay);
            });
            /*$("#day4").click(function(){
                $(this).text("Clicked");
            })*/
        }

        function outputDays(avalDays) {
            console.log(avalDays);
            // reset day boxes
            $(".day-area").html("");
            // output days
            var daysHTML = "html to make for loop better";
            var totalDays = avalDays + 1;
            for (var i = 1; i < totalDays; i++) {
                $(".day-area").append("<button class='aval-days' id='" + i + "'>" + i + "</button>");
            }
            getClikedDays();
        }

        function getDataJSON(userDate) {
            console.log(userDate);
            $.getJSON("js/avaldata.json")
                .done(function (json) {
                    $("body").append("<h1>" + json.datesArrayMay[0].DATE + "</h1>");

                    var getPod = json.datesArrayMay[0].GP1;
                    var getPodAval = json.datesArrayMay[0];
                    if (getPod) {
                        $("#daysstay").text(json.datesArrayMay[0].GP1AVFOR);
                        // this function param will take the userDate var from selected value in datepicker
                        var pod1aval = json.datesArrayMay[0].GP1AVFOR;
                        outputDays(pod1aval);
                        setSelectedDate(userDate,pod1aval);
                    } else {
                        $(".day-area").text("pod not avalaible");
                        console.log("pod not avalaible");
                    }

                    return json;

                    console.log("JSON Data: " + json.datesArrayMay[0]);


                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                });
        }
        // Init datepicker
        // beforeDay: add booked day for current pod/pitches

        // on input select
        // get selectedDate store in var
        //

        // Check JSON 

        // update number of days aval

    } // end bookingApp module 

    // Make it standalone module
    //bookingApp();
    bookingApp();
}); // window load wrap