<?php
include __DIR__ . '/db.php';

$title = $_POST['title'];
$content = $_POST['content'];

$sql = "INSERT INTO notes (title, content) VALUES ('$title', '$content')";
mysqli_query($conn, $sql);
?>
