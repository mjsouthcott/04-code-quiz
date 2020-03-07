// Variables pointing to jQuery objects
let $timer = $('#timer')
let $content = $('#content')
let $landing = $('#landing')
let $question = $(document.createElement('div')).attr('id', 'question')
let $answerFeedback = $(document.createElement('div')).attr('id', 'answer-feedback')
let $enterHighScore = $(document.createElement('div')).attr('id', 'enter-high-score')

// Various constants/variables
const timeRemaining = 60
let questionIndex = 0
let timerInterval

// Variables in localStorage (only declared/initialized if they don't already exist)
if (!localStorage.getItem('highScores')) {
    let highScores = []
    localStorage.setItem('highScores', JSON.stringify(highScores))
}
if (!localStorage.getItem('numQuizzes')) {
    localStorage.setItem('numQuizzes', 0)
}

// Function to randomize the question list. Accepts and returns an array.
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

// Function to start the quiz. Removes the landing container and replaces it with the first question container.
function startQuiz() {
    $landing.remove()
    $content.prepend($question)
    startTimer()
    nextQuestion()
}

// Function to start the timer. Counts down from timeRemaining in 1000 ms intervals. Ends the quiz if timeRemaining reaches 0.
function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--
        $timer.text(timeRemaining)
        if (timeRemaining === 0) {
            endQuiz()
        }
    }, 1000)
}

// Function to display the next question. Verifies that questionIndex is less than the length of questionList. Populates the HTML with content from the questionList question objects.
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
// Function to end the quiz. Removes the question container and replaces it with the enter-high-score container. Clears timerInterval and displays the time when the quiz ended.
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

// Event listener on the start-quiz button. Randomizes questionList and starts the quiz.
$content.on('click', '#start-quiz', function() {
    randomizeQuestionList(questionList)
    startQuiz()
})

// Event listener on the question buttons. Provides feedback depending on if the answer selected by the user was correct or incorrect. If an incorrect answer reduces timeRemaining to a negative value, sets timeRemaining to 0 and ends the quiz.
// Otherwise, it increases questionIndex by 1 and calls the nextQuestion function.
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


// Event listener on the submit button. Gets variables from localStorage, updates their values, and sets them in localStorage. Then takes user to High Score List page.
$content.on('click', '#submit', function(e) {
    e.preventDefault()
    let numQuizzes = localStorage.getItem('numQuizzes')
    highScores = JSON.parse(localStorage.getItem('highScores'))
    highScores.push(new Object())
    highScores[numQuizzes].initials = document.getElementById('initials').value.toUpperCase()
    highScores[numQuizzes].score = timeRemaining
    localStorage.setItem('highScores', JSON.stringify(highScores))
    numQuizzes++
    localStorage.setItem('numQuizzes', numQuizzes)
    window.location.href = "high-scores/index.html"
})