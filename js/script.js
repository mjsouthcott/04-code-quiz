let $timer = $('#timer')
let $startQuizButton = $('#start-quiz')
let $content = $('#content')
let $feedback = $('#feedback')

let timeRemaining = 60
let questionIndex = 0
let timerInterval, score

function randomizeQuestionList(questionList) {
    let currentIndex = questionList.length
    let randomIndex, temporaryValue
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        temporaryValue = questionList[currentIndex]
        questionList[currentIndex] = questionList[randomIndex]
        questionList[randomIndex] = temporaryValue
    }
    return questionList
}

function startQuiz() {
    startTimer()
    nextQuestion()
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--
        $timer.text(timeRemaining)
        if (timeRemaining === 0) {
            endQuiz()
        }
    }, 1000)
}

function nextQuestion() {
    if (questionIndex < questionList.length) {
        let msg = '<h3>' + questionList[questionIndex]["question"] + '</h3><ol>'
        for (let i = 0; i < questionList[questionIndex]["answers"].length; i++) {
            msg += '<li><button id="answer' + (i + 1) + '">' + (i + 1) + '. ' + questionList[questionIndex]["answers"][i] + '</button></li>'
        }
        msg += '</ol>'
        $content.html(msg)
    } else {
        endQuiz()
    }
}

function endQuiz() {
    clearInterval(timerInterval)
    $timer.text(timeRemaining)
    let msg = '<h1>Game Over</h1>'
    msg += '<p>Score: ' + timeRemaining + '</p>'
    $content.html(msg)
}

$startQuizButton.on('click', function() {
    randomizeQuestionList(questionList)
    startQuiz()
})

$content.on('click', 'ol button', function(e) {
    e.preventDefault()
    $this = $(this)
    if (questionList[questionIndex]["correctAnswer"] === $this.attr('id')) {
        $feedback.html('<p id="correct">Correct answer</p>')
        setTimeout(function() {
            $feedback.html('')
        }, 1000)
    } else {
        timeRemaining = timeRemaining - 10
        $feedback.html('<p id="incorrect">Incorrect answer</p>')
        setTimeout(function() {
            $feedback.html('')
        }, 1000)
    }
    if (timeRemaining < 0) {
        timeRemaining = 0
        endQuiz()
    } else {
        questionIndex++
        nextQuestion()
    }
})