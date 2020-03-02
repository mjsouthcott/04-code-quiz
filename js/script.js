let $timer = $('#timer')
let $startQuizButton = $('#start-quiz')
let $container = $('.container')
let questionList = JSON.stringify(questions)
console.log(questionList)

let timeRemaining = 5

function randomizeQuestions() {

}

function startGame() {

}

function startTimer() {
    let timerInterval = setInterval(function() {
        timeRemaining--
        $timer.text(timeRemaining)
        if (timeRemaining === 0) {
            clearInterval(timerInterval)
            endGame()
        }
    }, 1000)
}

function endGame() {
    $container.html('<h1>Game Over</h1>')
}

$startQuizButton.on('click', function(e) {
    e.preventDefault()
    $container.html('')
    startTimer()
})