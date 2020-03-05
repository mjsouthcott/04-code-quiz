let highScores = JSON.parse(localStorage.getItem('highScores'))

highScores.sort(function(a, b) {
    return b.score - a.score
})

console.log(highScores)

for (let i = 0; i < highScores.length; i++) {
    let highScoreMsg = '<li>' + (i + 1) + '. ' + highScores[i].initials + ' - ' + highScores[i].score + '</li>'
    $('#high-score-list ul').append(highScoreMsg)
}

$('#clear-high-scores').on('click', function(e) {
    e.preventDefault()
    highScores = []
    localStorage.setItem('highScores', JSON.stringify(highScores))
    localStorage.setItem('numQuizzes', 0)
    $('#high-score-list ul').html('')
})