<?php
  $userAnswer = $_POST['numDays']; 
  // $sql="SELECT * FROM <tablname> where color='".$userAnswer."'" ;
  //$result=mysql_query($sql);
  //$row=mysql_fetch_array($result);
  // for first row only and suppose table having data

//$dreamMaker = false;
/*if($userAnswer < 10){
    $dreamMaker = true;
}else{
    $dreamMaker = false;
}*/

$dreamMaker = false;
if($userAnswer <= 10){
    $dreamMaker = "The answer is < or = to 10: ";
}elseif ($userAnswer > 10){
    $dreamMaker = "Number is > 10";
}else {
    $dreamMaker = "Value is NaN, use a number to test ";
}
//$addStuff = $userAnswer + 1; // can be array or object [$userAnswer + 1, "HELLO"]

  echo json_encode($dreamMaker);  // pass array in json_encode 
//echo $userAnswer;
?>