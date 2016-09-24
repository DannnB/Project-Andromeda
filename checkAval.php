<?php
  $userAnswer = $_POST['numDays']; 
  // $sql="SELECT * FROM <tablname> where color='".$userAnswer."'" ;
  //$result=mysql_query($sql);
  //$row=mysql_fetch_array($result);
  // for first row only and suppose table having data

$dreamMaker = false;
if($userAnswer < 10){
    $dreamMaker = true;
}else{
    $dreamMaker = false;
}


  echo json_encode($dreamMaker);  // pass array in json_encode  
?>