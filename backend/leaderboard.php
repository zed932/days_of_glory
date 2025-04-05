<?php
$servername = "localhost";
$username = "u3054675_root1";
$password = "FBiQb3QK6Z9mWgw";
$dbname = "u3054675_test_results_DofG";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

//последние 10 результатов
$sql = "SELECT fio, student_group, score, timeUsed FROM results ORDER BY score DESC, timeUsed ASC LIMIT 10";
$result = $conn->query($sql);

$results = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
}

$conn->close();

//возврат данных в формате JSON
header('Content-Type: application/json');
echo json_encode($results);
?>