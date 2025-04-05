// Обновление таблицы с результатами
        function updateLeaderboard() {
            fetch('/backend/leaderboard.php')
                .then(response => response.json())
                .then(data => {
                    const resultsBody = document.getElementById('results-body');
                    resultsBody.innerHTML = ''; // Очистить текущие данные

                    data.forEach(result => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${result.fio}</td>
                            <td>${result.student_group}</td>
                            <td>${result.score}</td>
                            <td>${result.timeUsed}</td>
                        `;
                        resultsBody.appendChild(row);
                    });
                })
                .catch(error => console.error('Ошибка при загрузке данных:', error));
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
            
            // Показываем результаты
            if (timeUsed == 0) {
                timeResult.innerHTML = 'Вы еще не прошли тест';
            }
            else {
            timeResult.innerHTML = `
                <p>Вы прошли тест за ${timeString}</p>
            `;
            }
            // Обновление таблицы каждые 10 секунд
            setInterval(updateLeaderboard, 10000);
        });
