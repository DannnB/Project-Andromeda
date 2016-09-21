$(window).load(function () {
    console.log("Booking App Started");

    var consoleLine = "<p class=\"console-line\"></p>";

    console = {
        log: function (text) {
            $("#console-log").append($(consoleLine).html(text));
        }
    };
    ///////////////////
$(function(){
    var $select = $(".1-100");
    for (i=1;i<=14;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

    var howManyDays = 14;

    function showDays() {
        var start = $('#arr_date').datepicker('getDate');
        //$("body").append("select date: " + start)
        // var firstDate = ;
        // var firstDate = ;
        //var whichDate = new Date(start + 1.21e+9);
        //var fortnightAway = new Date(+new Date + 1.21e+9);
        if(true){
            
        }else{
            
        }
        //$("#dep_date").datepicker('setDate', whichDate);
        var end = $('#dep_date').datepicker('getDate');
        if (!start || !end) return; // if nothing is selected

        var days = (end - start) / 1000 / 60 / 60 / 24;
        $('.howManyDays').text(days);
        var selected = $(this).val();
        console.log(selected);
    }

    function showDatePick() {
        if (inst.inline) this._updateDatepicker(inst);
        else {
            this._hideDatepicker(null, this._get(inst, 'duration'));
            this._lastInput = inst.input[0];
            if (typeof (inst.input[0]) != 'object') inst.input[0].focus(); // restore focus
            this._lastInput = null;
        }
        $(this).val();
    }

    function setEndDate(selectedDate) {
        if (this.id == 'arr_date') {
            console.log(selectedDate);
            var arr = selectedDate.split("/");
            var date = new Date(arr[2] + "-" + arr[1] + "-" + arr[0]);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var minDate = new Date(y, m, d + 1);
            $("#dep_date").datepicker('setDate', minDate);

        }
    }

    function doStuff() {
        $('#arr_date').change(function(){
            console.log("aaf");
     
});
        showDays();
        showDatePick();
        setEndDate();
    }
    var array = ["2016-09-29", "2016-09-26"];

    function highlightMaxDays(date) {
        var today = new Date(),
            maxDate;
        today.setHours(0, 0, 0, 0);
        maxDate = new Date().setDate(today.getDate() + 17);
        if (date <= maxDate && date >= today) {
            return [true, 'myClass'];
        }
        return [true, ''];
    }

    
    function notAval(date) {
        var eventDates = {};
        eventDates[ new Date( '2016/09/29' )] = new Date( '2016/09/29' );
        eventDates[ new Date( '2016/09/27' )] = new Date( '2016/09/27' );
        var highlight = eventDates[date];
        if (highlight) {
            
             return [true, "event", highlight];
        } else {
             return [true, '', ''];
        }
        // change colours - not working on datepicker refresh????
        // var disa = $(".ui-state-disabled");
        // disa.css({"border":"3px red dotted"});
        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
        return [array.indexOf(string) == -1]
    }
    function doStuffBefore(){
        notAval(date);
        //highlightMaxDays();
    }
    $("#arr_date").datepicker({
        minDate: 3,
        maxDate: "+1M +10D",
        showButtonPanel: true,
        dateFormat: 'dd-mm-yy',
        beforeShowDay: notAval,
        onSelect: doStuff,
        onClose: function (selectedDate) {
            var dParts = selectedDate.split('-');
            var in30Days = new Date(dParts[2] + '/' +
                dParts[1] + '/' +
                (+dParts[0] + 30)
            );

            $("#dep_date").datepicker("option", "minDate", in30Days);
        }
    });
    $("#dep_date").datepicker({
        minDate: 3,
        maxDate: "+6M +7D",
        beforeShowDay: notAval,
        dateFormat: 'dd-mm-yy',
        onSelect: showDays

    });
    $("#arr_date").on("change",function(){
        var selected = $(this).val();
        alert(selected);
    });
    
});