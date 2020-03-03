let $timer = $('#timer')
let $startQuizButton = $('#start-quiz')
let $content = $('#content')
let $feedback = $('#feedback')

let timeRemaining = 60
let questionIndex = 0

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
    let timerInterval = setInterval(function() {
        timeRemaining--
        $timer.text(timeRemaining)
        if (timeRemaining < 1) {
            clearInterval(timerInterval)
            $timer.text(0)
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
    $content.html('<h1>Game Over</h1>')
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
            // TODO
            //$feedback.fadeout("fast", function() { $this.remove() })
    } else {
        timeRemaining = timeRemaining - 10
        $feedback.html('<p id="incorrect">Incorrect answer</p>')
            // TODO
            //$feedback.fadeout("fast", function() { $this.remove() })
    }
    questionIndex++
    nextQuestion()
})