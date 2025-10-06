<?php
include __DIR__ . '/db.php';

$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

$sql = "UPDATE notes SET title='$title', content='$content' WHERE id=$id";
mysqli_query($conn, $sql);
?>
