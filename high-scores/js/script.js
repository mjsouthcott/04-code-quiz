let $highScoreList = $('#high-score-list')

// TODO
let highScores = JSON.parse(localStorage.getItem('highScores'))

highScores.sort(function(a, b) {
    return a.score - b.score
})

console.log(highScores)