<?php
include_once("dbconnect.php");
$retVal = "";
$isValid = true;
$status = 400;


$jsonData = file_get_contents("php://input");
$formData = json_decode($jsonData);

$id = $conn->real_escape_string($formData->id);

$stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
$stmt->bind_param("s", $id);
$stmt->execute();



$myObj = array(
    'status' => $status,
    'message' => $retVal  
);

$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);

echo $myJSON;

?>