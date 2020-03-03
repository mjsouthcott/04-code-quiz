let $timer = $('#timer')
let $startQuizButton = $('#start-quiz')
let $container = $('.container')
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
        let msg = '<h3>' + questionList[questionIndex]["question"] + '</h3>'
        msg += '<ol><li><button id="answer1">1. ' + questionList[questionIndex]["answers"][0] + '</button></li>'
        msg += '<li><button id="answer2">2. ' + questionList[questionIndex]["answers"][1] + '</button></li>'
        msg += '<li><button id="answer3">3. ' + questionList[questionIndex]["answers"][2] + '</button></li>'
        msg += '<li><button id="answer4">4. ' + questionList[questionIndex]["answers"][3] + '</button></li></ol>'
        $container.html(msg)
    } else {
        endQuiz()
    }
}

function endQuiz() {
    $container.html('<h1>Game Over</h1>')
}

$startQuizButton.on('click', function() {
    randomizeQuestionList(questionList)
    startQuiz()
})

$container.on('click', 'ol button', function(e) {
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