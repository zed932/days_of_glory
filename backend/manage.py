from flask import Flask, request, render_template
import mysql.connector


app = Flask(__name__, static_folder="static", template_folder="templates")

# Подключение к базе данных
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="4619",
    database="test_results"
)
cursor = conn.cursor()

# Правильные ответы
correct_answers = {
    "q1": "b",
    "q2": "a",
    "q3": "b",
    "q4": "a",
    "q5": "b",
    "q6": "c",
    "q7": "b",
    "q8": "b"
}

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")  # Подключаем HTML-шаблон

@app.route("/submit", methods=["POST"])
def submit():
    fio = request.form.get("fio")
    group = request.form.get("group")
    score = sum(1 for q, ans in correct_answers.items() if request.form.get(q) == ans)

    # Запись в базу данных
    query = "INSERT INTO results (fio, student_group, score) VALUES (%s, %s, %s)"
    cursor.execute(query, (fio, group, score))
    conn.commit()

    return "<script>alert('Спасибо за прохождение теста! Ваши результаты сохранены.'); window.location='/';</script>"

if __name__ == "__main__":
    app.run(debug=True)

