<?php
// Database connection details
$servername = "localhost"; // Replace with your server name or IP address
$username = "root"; // Replace with your MySQL username
$password = "root"; // Replace with your MySQL password
$dbname = "sindy_project_2"; // Name of the database

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
