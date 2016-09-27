<?php
    //$userAccom = $_POST['testAccom'];
    $userDays = $_POST['numDays'];
    //$userDate = $_POST['testDate'];

/*function checkAval(dateToCheck){ // add other values in?
    $dateToCheck = dateToCheck;
    // $sql = "SELECT * FROM <tablname> where DATE='".$dateToCheck."'" ;
    //$result = mysql_query($sql);
    //$row = mysql_fetch_array($result);
    // check if 
    if(){
        
    }else{
        
    }
    checkAval($userDate);
    
  // for first row only and suppose table having data
}*/
//$dateAval = false;
  

$dreamMaker = false;
if($userDays <= 10){
    $dreamMaker = "The answer is < or = to 10: ";
}elseif ($userDays > 10){
    $dreamMaker = "Number is > 10";
}else {
    $dreamMaker = "Value is NaN, use a number to test ";
}

// give data back to ajax for frontend
echo json_encode($dreamMaker);



// get date table from DB and check AVAL DAYS and if POD/Camp is true 

// check if booking is still avaliable and then send redirect or other function back to front end (send to paypal or add "Pay with PayPal Button to frontend panel)

/*$isAval = "false";
if($dateAval){
    $isAval = true;
}else (!$dateAval){
    $isAval = false;
}
$test = toString($userDays);*/
// Add booking details to DB and update to piad when PayPal is confirmed



// tests

/*$dreamMaker = false;
if($userDays < 10){
    $dreamMaker = true;
}else{
    $dreamMaker = false;
}*/
//$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

//$addStuff = $userAnswer + 1; // can be array or object [$userAnswer + 1, "HELLO"]
//$d = array('foo' => 'bar', 'baz' => 'long');
    // pass array in json_encode 
  //echo json_encode($d, JSON_FORCE_OBJECT);  // pass array in json_encode as object for JS 
  //echo string json_encode ( mixed $value [, int $options = 0 [, int $depth = 512 ]] );  // pass array in json_encode 
//echo $userAnswer;
?>