let $timer = $('#timer')
let $startQuizButton = $('#start-quiz')
let $container = $('.container')
let $answerList = $('.ul')

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
    let msg = ""
    msg += "<h3>" + questionList[questionIndex]["question"] + "</h3>"
    msg += "<ol><li><button id=\"answer1\">1. " + questionList[questionIndex]["answers"][0] + "</button></li>"
    msg += "<li><button id=\"answer2\">2. " + questionList[questionIndex]["answers"][1] + "</button></li>"
    msg += "<li><button id=\"answer3\">3. " + questionList[questionIndex]["answers"][2] + "</button></li>"
    msg += "<li><button id=\"answer4\">4. " + questionList[questionIndex]["answers"][3] + "</button></li></ol>"
    $container.html(msg)
    startTimer()
    questionIndex++
}

function continueQuiz() {
    if (questionIndex < randomizedQuestionList.length) {
        let msg = ""
        msg += "<h3>" + questionList[questionIndex]["question"] + "</h3>"
        msg += "<ol><li><button id=\"answer1\">1. " + questionList[questionIndex]["answers"][0] + "</button></li>"
        msg += "<li><button id=\"answer2\">2. " + questionList[questionIndex]["answers"][1] + "</button></li>"
        msg += "<li><button id=\"answer3\">3. " + questionList[questionIndex]["answers"][2] + "</button></li>"
        msg += "<li><button id=\"answer4\">4. " + questionList[questionIndex]["answers"][3] + "</button></li></ol>"
        $container.html(msg)
        questionIndex++
    } else {
        endQuiz()
    }
}

function startTimer() {
    let timerInterval = setInterval(function() {
        timeRemaining--
        $timer.text(timeRemaining)
        if (timeRemaining === 0) {
            clearInterval(timerInterval)
            endQuiz()
        }
    }, 1000)
}

function endQuiz() {
    $container.html('<h1>Game Over</h1>')
}

$startQuizButton.on('click', function(e) {
    e.preventDefault()
    $container.html('')
    randomizeQuestionList(questionList)
    startQuiz()
})

// TODO
$answerList.on('click', 'li button', function(e) {
    e.preventDefault()
    let $this = $(this)
    console.log($this.value)
})