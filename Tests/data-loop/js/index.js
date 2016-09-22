//
// SCROLL DOWN FOR ACTIVE PART (NOT COMMENTED OUT)
// 

/*
var datesArrayApril = [
    {
      "DATE": "01/04/2017",
      "CAMP": true,
      "CAMPAVFOR": "14",
      "GP1": false,
      "GP1AVFOR": "0",
      "GP2": true,
      "GP2AVFOR": "3",
			"GP3": false,
      "GP3AVFOR": "0",
			"GP4": true,
      "GP4AVFOR": "13",
			"GP5": true,
      "GP5AVFOR": "7",
      "EVENT": true,
      "EVENTNAME": "Danfest",
      "EVENTURL": "http://www.danfest.com"
    },
	{
      "DATE": "02/04/2017",
      "CAMP": true,
      "CAMPAVFOR": "14",
      "GP1": false,
      "GP1AVFOR": "0",
      "GP2": true,
      "GP2AVFOR": "3",
			"GP3": false,
      "GP3AVFOR": "0",
			"GP4": true,
      "GP4AVFOR": "13",
			"GP5": true,
      "GP5AVFOR": "7",
      "EVENT": true,
      "EVENTNAME": "Danfest",
      "EVENTURL": "http://www.danfest.com"
    }
  ];

var datesArrayMay = [
    {
      "DATE": "09/05/2017",
      "CAMP": true,
      "CAMPAVFOR": "14",
      "GP1": false,
      "GP1AVFOR": "0",
      "GP2": true,
      "GP2AVFOR": "3",
			"GP3": false,
      "GP3AVFOR": "0",
			"GP4": true,
      "GP4AVFOR": "13",
			"GP5": true,
      "GP5AVFOR": "7",
      "EVENT": true,
      "EVENTNAME": "Danfest",
      "EVENTURL": "http://www.danfest.com"
    },
	{
      "DATE": "26/05/2017",
      "CAMP": true,
      "CAMPAVFOR": "14",
      "GP1": false,
      "GP1AVFOR": "0",
      "GP2": true,
      "GP2AVFOR": "3",
			"GP3": false,
      "GP3AVFOR": "0",
			"GP4": true,
      "GP4AVFOR": "13",
			"GP5": true,
      "GP5AVFOR": "7",
      "EVENT": true,
      "EVENTNAME": "Danfest",
      "EVENTURL": "http://www.danfest.com"
    }
  ];
*/

// use array index for the days date i.e date[(27-1)] to pick out days
/*
var getAURL = datesArrayMay[1].EVENTURL;
var getADate = datesArrayMay[1].DATE;
var getCountDate = datesArrayMay[1];
var spitOutAllData = datesArrayMay[1].EVENTURL;
*/

// get data and format links using the props from EVENT keys
/*$("#main").append("<h1>Get a specfic value: "+ getADate +"</h1><a href="+datesArrayMay[1].EVENTURL+" target='_blank'>Check out "+datesArrayMay[1].EVENTNAME+"</a>");*/

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// THE WORKING PART....
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

// this should work best with new array for each month, each month is an array. Even if one months data is given it can use  the users input date as a array index [26] as 27th, coded like var woo = selectedDate - 1; array start at 0.
// should will work with datepicker...just example of structure needed
var getMay = { // 'var getMay =' only used to hold json data for easy usage - do not include in generated file
	"datesArrayMarch": [{}],
	"datesArrayApril": [{}],
   "datesArrayMay": [{
     "DATE": "09/05/2017",
     "CAMP": true,
     "CAMPAVFOR": "14",
     "GP1": false,
     "GP1AVFOR": "0",
     "GP2": true,
     "GP2AVFOR": "3",
     "GP3": false,
     "GP3AVFOR": "0",
     "GP4": true,
     "GP4AVFOR": "13",
     "GP5": true,
     "GP5AVFOR": "7",
     "EVENT": true,
     "EVENTNAME": "Danfest",
     "EVENTURL": "http://www.danfest.com"
   }, {
     "DATE": "26/05/2017",
     "CAMP": true,
     "CAMPAVFOR": 14,
     "GP1": false,
     "GP1AVFOR": "0",
     "GP2": true,
     "GP2AVFOR": "3",
     "GP3": false,
     "GP3AVFOR": "0",
     "GP4": true,
     "GP4AVFOR": "13",
     "GP5": true,
     "GP5AVFOR": "7",
     "EVENT": true,
     "EVENTNAME": "Danfest",
     "EVENTURL": "http://www.danfest.com"
   }]
 };

var getAURL = getMay.datesArrayMay[1].EVENTURL;
var getADate = getMay.datesArrayMay[1].DATE;
//var getCountDate = datesArrayMay[1];
var getEventName = getMay.datesArrayMay[1].EVENTNAME;

// Makes event card for example
$("#main").append("<pre>Get a specfic value: "+ getADate +"</pre><h1>Event: "+getEventName+"</h1><a href="+getAURL+" target='_blank'>Check out "+getEventName+"</a>");
// glamping pod logic/fonrt visuals will be here
	
							
									
// the good part...formatting red and green for whats available, this sort of way can then be used to change the values for the calendar functions/visuals. Next to get it working with the datepicker calendar!

var getUl = $("#listObj");
function makeRed(objKey,objProp){
	if(!objProp || objProp == "0"){
		getUl.append("<li style='color:red;'>"+objKey+" = "+objProp+"</li>");
	}else{
		getUl.append("<li style='color:green;'>"+objKey+" = "+objProp+"</li>");
	}
}
for (var key in getMay.datesArrayMay) {
   var obj = getMay.datesArrayMay[key]; // can get single date as well this is just for testing
   for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
       console.log(prop + " = " + obj[prop]);
			 makeRed(prop,obj[prop])
			 //getUl.append("<li>"+prop+" = "+obj[prop]) // just outputs all the data with no logic
     }
   }
 }



/* for(i = 0, l = datesArrayMay[1].length; i < l; i++){
	var addStuff = $("#listObj");
	addStuff.append("<li>"+datesArrayMay[i]+"</li>")
}*/
/*

for (var key in datesArrayMay[1]) {
           var obj = data[1][key];
           for (var prop in obj) {
              if(obj.hasOwnProperty(prop)){
                console.log(prop + " = " + obj[prop]);
              }
           }
        }
				*/