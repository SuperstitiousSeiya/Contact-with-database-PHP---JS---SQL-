<?php 
include_once("dbconnect.php");

$sql = "SELECT * FROM contacts ORDER BY lastname";
$result = $conn->query($sql);

// Fetch the data from the query result
$data = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');

echo json_encode($data);

?>