<?php
$servername = "localhost";
$username = "root"; // Укажите вашего пользователя БД
$password = " "; // Укажите ваш пароль БД
$dbname = "database"; // Имя вашей базы данных

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем подключение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}


// Правильные ответы
$correct_answers = [
    "q1" => "b",
    "q2" => "a",
    "q3" => "a",
    "q4" => "a",
    "q5" => "a",
    "q6" => "a",
    "q7" => "a",
    "q8" => "a"
];

// Получаем данные из формы
$fio = $_POST['fio'] ?? '';
$group = $_POST['group'] ?? '';
$score = 0;
$timeUsed = $_POST['timeUsed'] ?? 0;

// Подсчет правильных ответов
foreach ($correct_answers as $question => $correct_answer) {
    if (isset($_POST[$question]) && $_POST[$question] === $correct_answer) {
        $score++;
    }
}

// Запись в базу данных
$sql = "INSERT INTO results (fio, student_group, score, timeUsed) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssii", $fio, $group, $score, $timeUsed);

// Закрываем соединение
$stmt->close();
$conn->close();
?>
