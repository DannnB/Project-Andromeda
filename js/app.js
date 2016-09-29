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
        
        
        
        
        
        
        // init the datepicker
        // disable days
        
        function setUnAvalDates(date) {
            var dateArray = []; // get this from JSON?? 
            /*
            function getAllUnAvalDates() { // adds to array
                dateArray.push("2016-10-10", "2016-10-15")
                console.log(dateArray);
            }
            getAllUnAvalDates();*/
            //var array = ["2016-09-29", "2016-09-26"]; 
            /*  function woops(date){
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [ dateArray.indexOf(string) == -1 ]
    }*/
        }
        //setUnAvalDates();
        // user selection part
        var userDate = "Please pick a date!"; // get user date, string for testing

        // disable dates
        var arrayD = ["2016-10-14", "2016-10-15", "2013-10-16"]

        var holydays = ['10-12-2016', '10-20-2016', '10-13-2016'];

        function highlightDays(date) {
            for (var i = 0; i < holydays.length; i++) {
                if (new Date(holydays[i]).toString() == date.toString()) {
                    console.log(holydays[i]);
                    return [true, 'highlight'];
                }
            }
            return [true, ''];

        }


        // get seleted date
        // datepicker init
        $("#arr_date").datepicker({
            inline: true
            , minDate: 5
            , maxDate: "+4Y"
            , showOtherMonths: true
            , dateFormat: 'yy-mm-dd'
            , dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            , onSelect: function (date) {
                //console.log(date);
                userDate = date;
                getDataJSON(userDate);
                serverCheck(userDate); // add date to check server if still aval
            }
            , beforeShowDay: //highlightDays,

                function (date) {
                var array = ["2016-10-14", "2016-10-17", "2016-10-18"];
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1]
            }
        });






        $("somethingtogetdate if needed").click(function () {
            var first, second;
            first = $(".datepicker[name=datepicker1]").val();
            second = $(".datepicker[name=datepicker2]").val();
            alert(first + " , " + second);
            first = $(".datepicker[name=datepicker1]").datepicker('getDate');
            second = $(".datepicker[name=datepicker2]").datepicker('getDate');
            alert(first + " , " + second);
        });


        // get json
        /*$("#giveMeData").click(function () {
            // onSelected methord will run this fuction
            getDataJSON(userDate);
        });*/

        function setSelectedDate(getUserDate, getMaxDays) {
            var formatDate = moment(getUserDate).format('DD/MM/YYYY');

            $("#arr-date-set").text("Arriving on the " + formatDate);
            //$("#arr-date-set").text("Arriving on the " + getUserDate);
            $("#your-max-days").text("You can stay for a maximum of " + getMaxDays + " days. If you would like more days please select a date before the current one.");
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
            //console.log(avalDays);

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








        var accom = "GP1"; // get 
        //// WORK ON THIS LOOP
        function getDateData(json) {
            // loop through JSON to find the date user selected
            console.log("JSON DATA IS: " + json.datesArrayMay[0].GP1);

            var getUl = $("#listObj");
            getUl.text("");

            function makeRed(objKey, objProp) {
                if (!objProp || objProp == "0") {
                    getUl.append("<li style='color:red;'>" + objKey + " = " + objProp + "</li>");
                } else {
                    getUl.append("<li style='color:green;'>" + objKey + " = " + objProp + "</li>");
                    if (objKey === "DATE" && objProp === "09/05/2017") {
                        //var getIndex = json.findIndex(x => x.objProp == "09/05/2017")
                        //console.log("The index of "+objProp+" is: " + getIndex);
                        getUl.append("<li style='color:blue;'>" + objKey + " = " + objProp + "</li>");
                    } else {
                        getUl.append("<li style='color:red;'>No date exists</li>");
                    }
                }
            }
            for (var key in json.datesArrayMay) {
                var obj = json.datesArrayMay[key]; // can get single date as well this is just for testing
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        //console.log(prop + " = " + obj[prop]);
                        makeRed(prop, obj[prop]);
                            //getUl.append("<li>"+prop+" = "+obj[prop]) // just outputs all the data with no logic
                    }
                }
            } // end LOOP

            // add chosen data to object/array



            // output DATE data to html frontend


        }

        /// FIX THIS SECTION, ITS NOT FINDING GP1????
        function getDataJSON(userDate) {
            console.log(userDate);
            
            var userDate = userDate;
            var userDateTest = "04/15/2017"; //"04/10/2017";
            var userMonth = "april";
            var userAccommType = "GP1";
            var userAccommAval = "AVAL"; // constant
            var userDateAvalDays = "AVFOR"; // constant

            $.getJSON("js/avaldata.json")
                .done(function (json) {
                    getDateData(json);
                    
                    var getPod = json.datesArrayMay[0].GP1;
                    var getPodAval = json.datesArrayMay[0];
                    var isAccomAval = json.datesObj[userMonth][userDateTest][userAccommType][userAccommAval];
                    //var isAccomAval = json.datesObj[userMonth][userDateTest];
                    console.log("Is AVAL: " + isAccomAval);
                    if (isAccomAval) {
                        //$("#daysstay").text(json.datesArrayMay[0].GP1AVFOR);
                        //$("#testArea").text(json.datesObj[userMonth][userDateTest][userAccommType]["AVFOR"]);
                        $("#testArea").text(json.datesObj[userMonth][userDateTest][userAccommType][userDateAvalDays]);
                        //$("#testArea").text(json.datesObj[userMonth][userDateTest]);

                        

                        // this function param will take the userDate var from selected value in datepicker
                        var pod1aval = json.datesArrayMay[0].GP1AVFOR;

                        outputDays(pod1aval);
                        setSelectedDate(userDate, pod1aval);
                        //$("#your-max-days").after("<h2>"+pod1aval+"</h2>");
                        // set user prompt in input
                        var defaultDayBox = $("#your-max-days");
                        var pickNightsID = $("#pick-nights");
                        if (pickNightsID) {
                            // reset how many nights text on each date click
                            pickNightsID.html("");
                        } else {
                            console.log("test");
                        }
                        defaultDayBox.after("<h2 id='pick-nights'>Pick your nights from a max of " + pod1aval + "</h2>");
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

        // SEND/GET STUFF TO PHP USING AJAX
        function serverCheck(userDateStore) {
            var testReturnDays, testDays;
            var requestButton = $("#postGetData");
            var userDataNow = userDateStore;

            function getJSONData(phpData) {
                console.log(" The server returned: " + phpData);
                //getFromServer(phpData);
            }

            function sendToServer(userDataNow) {
                var testDays = 7; // number to test
                var testDate = userDataNow; // date to test

                // send to php, if great or less return true false
                // requestButton.click(function () { // use for button test, remove () at end of function

                (function () { // runs check on date selected
                    console.log("Post and Get data button clicked");
                    $.ajax({
                        url: 'js/checkAval.php', //This is the current doc
                        type: "POST"
                        , dataType: 'json', // add json datatype to get json
                        data: ({
                            numDays: testDays
                            , theDate: testDate
                        })
                        , success: function (data) {
                            console.log(data);
                            //getJSONData(data);
                        }
                    }).fail(function () {
                        console.log("Error: Your Dreams be Dreams");
                    });
                    /*$.ajax({
                        url: 'ajax.php', //This is the current doc
                        type: "POST"
                        , data: ({
                            name: 145
                        })
                        , success: function (data) {
                            console.log(data);
                            alert(data);
                            //or if the data is JSON
                            var jdata = jQuery.parseJSON(data);
                            getJSONData(phpData);
                        }
                    }).fail(function () {
                        console.log("error");

                    });*/
                }());

            }

            function getFromServer(testReturnDays) {
                if (testReturnDays) { // if => than 10 TRUE
                    console.log("the value is true");
                } else { // if < than 10 FALSE
                    console.log("the value is false");
                }
            }
            sendToServer(userDateStore);
        }
        //serverCheck();



        ////// INFO FOR NOTES
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