<?php 
include_once("dbconnect.php");
$retVal = array(
    'firstname' => "",
    'lastname' => "",
    'email_address' => "",
    'contact' => ""
);

$isValid = true;
$status = 400;


// json handler 
$jsonData = file_get_contents("php://input");
$formData = json_decode($jsonData);

// convert json data into individual sting
$id = $conn->real_escape_string($formData->id);
$fname = $conn->real_escape_string($formData->firstname);
$lname = $conn->real_escape_string($formData->lastname);
$email = $conn->real_escape_string($formData->email_address);
$contact = $conn->real_escape_string($formData->contact_number);


// check validation 

    // Check fields are empty or not
    if($fname == '' || $lname == '' || $email == '' || $contact == ''){
        $isValid = false;
        $retVal = "Please fill all fields.";
    }


    // Check if email is valid or not
    if ($isValid && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $isValid = false;
        $retVal['email_address'] = "Please enter a valid Email Address";
    }
    
    // Check if email already exists
    if($isValid){
        $stmt = $conn->prepare("SELECT * FROM contacts WHERE email_address = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $currentEmail = $conn->prepare("SELECT * FROM contacts WHERE email_address = ? AND id = ?");
        $currentEmail->bind_param("si", $email, $id);
        $currentEmail->execute();
        $currentEmailResult = $currentEmail->get_result();
        
        $stmt->close();
        if($result->num_rows > 0){
            
            if($currentEmailResult->num_rows > 0){
               
            }else{
                $isValid = false;
                $retVal['email_address'] = "Email already exists.";
            }

        }
    }

    // check contact validity 
    if($isValid && !(preg_match("/^9\d{9}$/", $contact))){
        $isValid = false;
        $retVal['contact'] = "Number must contain 10 digits e.g (9xxxxxxxxx)";
    }


    // Insert records
    if($isValid){
        $updateSQL = "UPDATE contacts SET firstname = ?, lastname = ?, email_address = ?, contact_number = ? WHERE id = ?";
        $stmt = $conn->prepare($updateSQL);
        $stmt->bind_param("ssssi", $fname, $lname, $email, $contact, $id); 
        $stmt->execute();
        $stmt->close();
        $status = 200;
        $retVal = "";
    }

    $myObj = array(
        'status' => $status,
        'message' => $retVal  
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    
    echo $myJSON;


?>