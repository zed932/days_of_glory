// Обновление таблицы с результатами
function updateLeaderboard() {
    fetch('/backend/leaderboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                document.getElementById('userPosition').innerHTML = `<p>Ошибка: ${data.message}</p>`;
                return;
            }

            const resultsBody = document.getElementById('results-body');
            const userPositionElement = document.getElementById('userPosition');

            resultsBody.innerHTML = '';
            
            data.forEach((result, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${result.fio}</td>
                    <td>${result.student_group}</td>
                    <td>${result.score}</td>
                    <td>${result.timeUsed}</td>
                `;
                resultsBody.appendChild(row);
            });
            
            const currentUserFio = localStorage.getItem('currentUserFio');
            if (currentUserFio) {
                const currentUser = data.find(user => user.fio === currentUserFio);
                
                if (currentUser) {
                    const position = data.findIndex(user => user.fio === currentUserFio) + 1;
                    
                    if (position <= 20) {
                        userPositionElement.innerHTML = `
                            <p>Поздравляем, ${currentUser.fio}! Вы в 20 лучших!</p>
                            <p>Ваше место - <strong>${position}</strong> с ${currentUser.score} очками!</p>
                        `;
                    } else {
                        userPositionElement.innerHTML = `
                            <p>Вы пока не вошли в топ 20, ${currentUser.fio}!</p>
                        `;
                    }
                } else {
                    userPositionElement.innerHTML = '<p>Ваши результаты еще не добавлены в рейтинг.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            document.getElementById('userPosition').innerHTML = '<p>Ошибка при загрузке данных. Попробуйте позже.</p>';
        });
}

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateLeaderboard();
    
    const timeResult = document.getElementById('time-result');
    const timeUsed = parseInt(localStorage.getItem('testTime')) || 0;
    
    // Форматируем время
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    const timeString = `${minutes} мин ${seconds} сек`;
    
    if (timeUsed === 0) {
        timeResult.innerHTML = 'Вы еще не прошли тест';
    } else {
        timeResult.innerHTML = `<p>Вы прошли тест за ${timeString}</p>`;
    }
    
    setInterval(updateLeaderboard, 10000);
});
