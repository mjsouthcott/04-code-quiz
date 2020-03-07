$(document).ready(() => {
    // Get highScores from localStorage
    let highScores = JSON.parse(window.localStorage.getItem('highScores'))

    // Sort highScores in descending order by score
    highScores.sort(function(a, b) {
        return b.score - a.score
    })

    // Display the high scores in the window
    for (let i = 0; i < highScores.length; i++) {
        let highScoreMsg = '<li>' + (i + 1) + '. ' + highScores[i].initials + ' - ' + highScores[i].score + '</li>'
        $('#high-score-list ul').append(highScoreMsg)
    }

    // Event listener for clear-high-scores button. Sets localStorage variables to 0/an empty array, clearing the high scores from the window.
    $('#clear-high-scores').on('click', function(e) {
        e.preventDefault()
        highScores = []
        window.localStorage.setItem('highScores', JSON.stringify(highScores))
        window.localStorage.setItem('numQuizzes', 0)
        $('#high-score-list ul').html('')
    })
})