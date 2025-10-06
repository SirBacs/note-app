<?php
$servername = getenv('DB_HOST');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');
$dbname = getenv('DB_NAME');
$port = getenv('DB_PORT') ?: 3306;

$conn = new mysqli($servername, $user, $pass, $dbname, $port);

if (!$conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
