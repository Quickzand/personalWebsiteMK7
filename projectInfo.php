<?php 
// Get the variable projectId
$projectId = $_GET['projectID'];
// If its possible to grab a password 
if (isset($_GET['password'])) {
    // Get the variable password
    $password = $_GET['password'];
    // Make sure to clean the password
    $password = clean($password);
    // Check if the password is correct
    if ($password == "123") {
        // If the password is correct, then get the project info
        $projectInfo = getProjectInfo($projectId);
        // Return the project info
        echo $projectInfo;
    } else {
        // If the password is incorrect, then return an object where error = true
        echo json_encode(array("error" => true));
    }

    exit();
}


$projectInfo =  getProjectInfo($projectId);

// echo out info
echo $projectInfo;




// Gets the project info from projectInfo.json and get the corresponding project id from the dictonary 
function getProjectInfo($projectId) {
    // Get the project info from projectInfo.json
    $projectInfo = file_get_contents("projectInfo.json");
    // Decode the project info
    $projectInfo = json_decode($projectInfo, true);
    // Get the project info from the dictonary
    $projectInfo = $projectInfo[$projectId];
    // Return the project info
    return json_encode($projectInfo);
}


// Function for cleaning and sanatizing a password 
function clean($string) {
    // Remove all html tags
    $string = strip_tags($string);
    // Remove all spaces
    $string = str_replace(' ', '', $string);
    // Remove all slashes
    $string = stripslashes($string);
    // Remove all special characters
    $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
    // Return the cleaned string
    return $string;
}