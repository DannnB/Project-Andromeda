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
        var debugObj = {};
        // MAIN INTERFACE VARS
        var getKupbook = $(".kupbook"), // main booking holder after footer
            getPanel = "placeholder", // Values: HOME, TYPESELECT, CAMP, GP1, GP2, GP3, GP4, GP5
            setView = $(".panels");
        setView.hide(); // default booking panels hidden
        // Store all panels in dom cache (faster)
        var getpanel1home = $("#panel1home"),
            getpanel2camp = $("#panel2camp"),
            getpanel2glamptype = $("#panel2glamptype"),
            getpanel3glamp = $("#panel3glamp"),
            getpanel4details = $("#panel4details"),
            getpanel5final = $("#panel5final"),
            currentPanel = $("#panel1home"), // get id of shown panel
            currentPanelTest = "";

        // MAIN VARS FOR DATE PICKER
        var userDate = "Please pick a date"; // default

        // MAIN FORM DATA FOR PHP SUBMIT - this will get updates as the user progresses through the panels
        // Variables to pass to booking.php
        var formArrivalDate = userDate,
            formAccommType = "Pick a type",
            formNoOfNights = 0,
            formAdults = 0,
            formChildren = 0,
            formDogs = 0,
            formElectricity = false, // FINAL DETAILS
            formUsersName = false,
            formUsersEmail = false,
            formUsersPhone = false,
            formUsersTotalAmount = 0;

        // DEBUG SETTINGS FOR ALL PANELS - CAN BE USED FOR MASS CHANGES
        var panelDebug = true;
        if (panelDebug) {
            getpanel1home.show().addClass("panel-active");
            getpanel2camp.show();
            getpanel2glamptype.show();
            getpanel3glamp.show();
            getpanel4details.show();
            getpanel5final.show();
        }
        getpanel3glamp.show();

        // BOOKING APP BAR

        function bookingappbar() {
            $("#closebtn").hide();
            $("#booknowbtn").click(function () {
                $(".pan1").toggle();
                $("#booknowbtn").hide();
                $("#closebtn").show();
                $("#mainbookingappbar").toggleClass("showBar");
            });
            $("#closebtn").click(function () {
                $(".pan1").toggle();
                $("#closebtn").hide();
                $("#booknowbtn").show();
                $("#mainbookingappbar").toggleClass("showBar");
            });
            panelNav();
        }
        bookingappbar();

        function panelNav() {
            $("#glampingPanBtn").click(function () {
                $(".pan1").hide();
                $(".pan2").show();
            })
        }

        // DATEPICKER INIT - MAIN FUNCTIONS GET CALLED HERE WITH USER INTERACTION
        $("#arr_date").datepicker({
            inline: true,
            minDate: 5,
            maxDate: "+5Y",
            showOtherMonths: true,
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            onSelect: function (date) {
                //console.log(date);
                userDate = date;
                getDataJSON(userDate);
                serverCheck(userDate); // add date to check server if still aval
            },
            beforeShowDay: function (date) {
                var array = ["2016-10-14", "2016-10-17", "2016-10-18"];
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1]
            }

        });

        // DISABLE DATES FUNC
        function disableDates() {
            // beforeShowDay main func that does not work with 
            function disableWithCustomArray() {
                var array = ["2016-10-14", "2016-10-17", "2016-10-18"];
                var string = jQuery.datepicker.formatDate('yy-mm-dd', theDate);
                return [array.indexOf(string) == -1]
                    // run test array for disabled dates

            }
            //disableWithCustomArray()
            // Needs to check the chose accomm is aval(true) if not then disable dates
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
            function disableDatesArray() {
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
            }
        } // DISABLE DATES END







        function setSelectedDate(getUserDate, getMaxDays) {
            formArrivalDate = getUserDate;
            var formatDate = moment(getUserDate).format('DD/MM/YYYY');

            $("#arr-date-set").text("Arriving on the " + formatDate);
            //$("#arr-date-set").text("Arriving on the " + getUserDate);
            $("#your-max-days").text("You can stay for a maximum of " + getMaxDays + " days. If you would like more days please select a date before the current one.");
        }

        function setSelectedNumDays(numDay) {
            $(".num-days").val(numDay);

            formNoOfNights = numDay;
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
                var turnOffDebugLoop = false;

                if (turnOffDebugLoop) {
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
            } // end debug on/off
            // add chosen data to object/array



            // output DATE data to html frontend


        }

        function getDataJSON(userDate, userAccommType, userDateMonth) {
            console.log(userDate);
            // MAIN VARS - GET DATA FROM ONSLELECT FUNCTION
            var userDate = userDate,
                userMonth = userDateMonth,
                userAccommType = userAccommType,
                userAccommAval = "AVAL", // constant
                userDateAvalDays = "AVFOR"; // constant

            // TEST VARS - USE TO TEST GETTING DATA FROM JSON
            var userDateTest = "04/10/2017", //"04/10/2017";
                userMonthTest = "april",
                userAccommTypeTest = "GP1";


            $.getJSON("js/avaldata.json")
                .done(function (json) {
                    getDateData(json);

                    var getPod = json.datesArrayMay[0].GP1;
                    var getPodAval = json.datesArrayMay[0];


                    var isAccomAval = json.datesObj[userMonthTest][userDateTest][userAccommTypeTest][userAccommAval];

                    if (isAccomAval) { // isAccomAval
                        //$("#testArea").text(json.datesObj[userMonth][userDateTest][userAccommType]["AVFOR"]);
                        //$("#testArea").text(json.datesObj[userMonthTest][userDateTest][userAccommTypeTest][userDateAvalDays]);



                        // this function param will take the userDate var from selected value in datepicker
                        //var pod1aval = json.datesArrayMay[0].GP1AVFOR;
                        var pod1aval = json.datesObj[userMonthTest][userDateTest][userAccommTypeTest][userDateAvalDays];

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
                        type: "POST",
                        dataType: 'json', // add json datatype to get json
                        data: ({
                            numDays: testDays,
                            theDate: testDate
                        }),
                        success: function (data) {
                            console.log(data);
                            //getJSONData(data);
                        }
                    }).fail(function () {
                        console.log("Error: (PHP) Your Dreams be Dreams");
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

        function passFormData(theObj) {
            var formData = theObj;
            //console.log(formData);
            return formData;
        }
        function completeBooking() {
            console.log("adadadadadad");
            console.log(passFormData());
            $("#submitBookingBtn").click(function () {

                
            })
        }
        
        
        
        //serverCheck();

        // debug floating div
        function getClikedPod(podNum) {
            $(".podbox").click(function () {
                console.log(event.target.id);
                var clickedPod = event.target.id;
                $("#deAccommType").text(clickedPod)
            });
        }

        function outputPods(podNum) {
            getClikedPod(podNum);
        }


        $(function () {
            setInterval(debugFloat, 1000);
        });

        function debugFloat() {
            // all this func can be used as a template for passing vars to PHP with an object, test it it then create the main functions after tests. AJAX = data: debugObj
            var debugBox = $("#debugvar"),
                getNightsBox = $("#deNights");

            // get form data
            var formValFirstname = $("#firstname").val(),
                formValLastname = $("#lastname").val(),
                formValEmail = $("#email").val(),
                formValPhone = $("#phoneNum").val();


            debugObj.accommType = formAccommType;
            debugObj.arr = formArrivalDate;
            debugObj.nights = formNoOfNights;
            debugObj.adults = formAdults;
            debugObj.children = formChildren;
            debugObj.dogs = formDogs;
            debugObj.elec = formElectricity;
            //debugObj.userName = formUsersName;
            debugObj.userName = formValFirstname + " " + formValLastname;
            //debugObj.userPhone = formUsersPhone;
            debugObj.userPhone = formValPhone;
            //debugObj.userEmail = formUsersEmail;
            debugObj.userEmail = formValEmail;
            debugObj.userTotal = formUsersTotalAmount;



            function changeDebugBox(obj) {
                var debugData = obj;
                $("#deAccommType").text(debugData.accommType);
                $("#deArrDate").text(debugData.arr);
                $("#deNights").text(debugData.nights)
                $("#deAdults").text(debugData.adults);
                $("#deChildren").text(debugData.children);
                $("#deDogs").text(debugData.dogs);
                $("#deElec").text(debugData.elec);
                $("#deName").text(debugData.userName);
                $("#deEmail").text(debugData.userEmail);
                $("#dePhone").text(debugData.userPhone);
                $("#deTotalAmmount").text(debugData.userTotal);

            };

            changeDebugBox(debugObj);
            //passFormData(debugObj);
            completeBooking();

        }
        $("#testDeAdults").click(function () {
            formNoOfNights = formNoOfNights + 1;
        });

        





    } // end bookingApp module 


    // Make it standalone module
    //bookingApp();
    bookingApp();
}); // window load wrap