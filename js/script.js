let $timer = $('#timer')
let $content = $('#content')
let $landing = $('#landing')
let $question = $(document.createElement('div')).attr('id', 'question')
let $answerFeedback = $(document.createElement('div')).attr('id', 'answer-feedback')
let $enterHighScore = $(document.createElement('div')).attr('id', 'enter-high-score')
    //let $initials = $('#initials')

let timeRemaining = 60
let questionIndex = 0
let timerInterval
if (!localStorage.getItem('initialsArray')) {
    let initialsArray = []
    localStorage.setItem('initialsArray', JSON.stringify(initialsArray))
}
if (!localStorage.getItem('numQuizzes')) {
    localStorage.setItem('numQuizzes', 0)
}

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
    $landing.remove()
    $content.prepend($question)
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
    $question.html('')
    if (questionIndex < questionList.length) {
        let questionMsg = '<h3>' + questionList[questionIndex]["question"] + '</h3><ol>'
        for (let i = 0; i < questionList[questionIndex]["answers"].length; i++) {
            questionMsg += '<li><button id="answer' + (i + 1) + '">' + (i + 1) + '. ' + questionList[questionIndex]["answers"][i] + '</button></li>'
        }
        questionMsg += '</ol>'
        $question.append(questionMsg)
    } else {
        endQuiz()
    }
}

function endQuiz() {
    $question.remove()
    clearInterval(timerInterval)
    $timer.text(timeRemaining)
    let enterHighScoreMsg = '<h3>All done!</h3>'
    enterHighScoreMsg += '<p>Your final score is: ' + timeRemaining + '.</p>'
    enterHighScoreMsg += '<form><p>Enter initials: <input id="initials" type="text" name="initials" size="15" maxlength="15" required="required" />'
    enterHighScoreMsg += '<input id="submit" type="submit" name="submit" value="Submit" /></p></form>'
    $enterHighScore.html(enterHighScoreMsg)
    $content.prepend($enterHighScore)
}

$content.on('click', '#start-quiz', function() {
    randomizeQuestionList(questionList)
    startQuiz()
})

$content.on('click', 'ol button', function(e) {
    e.preventDefault()
    $this = $(this)
    $answerFeedback.html('')
    if (questionList[questionIndex]["correctAnswer"] === $this.attr('id')) {
        $answerFeedback.append('<p id="correct">Correct!</p>')
        $content.append($answerFeedback)
        setTimeout(function() {
            $answerFeedback.remove()
        }, 1000)
    } else {
        timeRemaining = timeRemaining - 10
        $answerFeedback.append('<p id="incorrect">Incorrect!</p>')
        $content.append($answerFeedback)
        setTimeout(function() {
            $answerFeedback.remove()
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

$content.on('click', '#submit', function(e) {
    e.preventDefault()
    let numQuizzes = localStorage.getItem('numQuizzes')
    initialsArray = JSON.parse(localStorage.getItem('initialsArray'))
    initialsArray.push(new Object())
        // is there a way to use a jQuery object/method?
    initialsArray[numQuizzes].initials = document.getElementById('initials').value.toUpperCase()
    initialsArray[numQuizzes].score = timeRemaining
    localStorage.setItem('initialsArray', JSON.stringify(initialsArray))
    numQuizzes++
    localStorage.setItem('numQuizzes', numQuizzes)
    window.location.href = "high-scores/index.html"
})