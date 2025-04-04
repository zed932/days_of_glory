document.addEventListener('DOMContentLoaded', function() {
    const timerElement = document.getElementById('timer');
    const submitButton = document.getElementById('submit-test');
    const quizForm = document.getElementById('quiz-form');
    
    let timeLeft = 300; // 5 минут в секундах
    let timerId;
    let testCompleted = false;

    // Запуск таймера
    function startTimer() {
        timerId = setInterval(updateTimer, 1000);
    }

    // Обновление таймера
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            completeTest(true); // true - время истекло
        } else {
            timeLeft--;
        }
    }

    // Завершение теста
    function completeTest(timeExpired = false) {
        if (testCompleted) return;
        testCompleted = true;
        clearInterval(timerId);
        
        // Сохраняем оставшееся время
        const timeUsed = 300 - timeLeft;
        localStorage.setItem('testTime', timeUsed);
        
        // Перенаправляем на страницу результатов
        window.location.href = 'leaderboard.html';
    }

    // Обработчик кнопки завершения теста
    submitButton.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите завершить тест?')) {
            completeTest();
        }
    });

    // Запускаем таймер при загрузке страницы
    startTimer();
});