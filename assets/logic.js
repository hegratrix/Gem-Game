let targetTotal = Math.floor(Math.random() * 101) + 19
$('#target').text(targetTotal)
let totalScore = 0
let gem1 = 0
let gem2 = 0
let gem3 = 0
let gem4 = 0
let gameStatus = true
let winScore = 0
let loseScore = 0

for (i = 1; i < 5; i++) {
    $('#gem-container').append(`
        <div id>
            <img class ="gem" data-gem =${Math.floor(Math.random()*11) + 1} id ="gem${i}" src="./assets/images/gem${i}.png" alt="gem">
            <h2 class ="value"></h2>
        </div>
    `)
    $('#gem-container2').append(`
        <div id>
            <img class ="gem-deduct" id ="gem2${i}" src="./assets/images/gem${i}.png" alt="gem">
        </div>
    `)
    setDeductGem ()
}

function win () {
    gameStatus = false
    winScore++
    $('#wins').text('Wins: ' + winScore)
    $('#running-total').text('')
    $('#help-me').text('Way to go! You helped me reach my goal!')
    setTimeout(function () {
        reset()
    }, 2000);
}

function lose (){
    gameStatus = false
    loseScore++
    $('#losses').text('Losses: ' + loseScore)
    $('#running-total').text('')
    $('#help-me').text('Bummer! You went over, try again.')
    setTimeout(function () {
        reset()
    }, 2000);
}

function reset () {
    gameStatus = true
    totalScore = 0
    $('#help-me').text('Please help me collect enough gems to hit my goal!')
    $('#running-total').text(totalScore)
    let percent = (totalScore/targetTotal)*100
    let fill = 100-percent + "%"
    $('#graph-background').css('height', fill)
    $('#gem1').attr('data-gem',Math.floor(Math.random()*11) + 1)
    $('#gem2').attr('data-gem',Math.floor(Math.random()*11) + 1)
    $('#gem3').attr('data-gem',Math.floor(Math.random()*11) + 1)
    $('#gem4').attr('data-gem',Math.floor(Math.random()*11) + 1)
    targetTotal = Math.floor(Math.random() * 101) + 19
    $('#target').text(targetTotal)
    setDeductGem ()
}

function restart () {
    totalScore = 0
}

function setDeductGem (){
    gem1 = $('#gem1').attr('data-gem')
    $('#gem21').attr("data-gem", gem1)
    gem2 = $('#gem2').attr('data-gem')
    $('#gem22').attr("data-gem", gem2)
    gem3 = $('#gem3').attr('data-gem')
    $('#gem23').attr("data-gem", gem3)
    gem4 = $('#gem4').attr('data-gem')
    $('#gem24').attr("data-gem", gem4)
}

$('.gem').on('click', function(){
    if (gameStatus === true) {
        let addend = $(this).attr('data-gem')
        totalScore += parseInt(addend)
        $('#running-total').text(totalScore)
        let percent = (totalScore/targetTotal)*100
        let fill = 100-percent + "%"
        $('#graph-background').css('height', fill)
        gameCheck ()
    }
})

$('.gem-deduct').on('click', function(){
    if (gameStatus === true) {
        let subtrahend = $(this).attr('data-gem')
        if (totalScore >= subtrahend) {
            totalScore -= parseInt(subtrahend)
            $('#running-total').text(totalScore)
            let percent = (totalScore/targetTotal)*100
            let fill = 100-percent + "%"
            $('#graph-background').css('height', fill)
            gameCheck ()
        }
    }
})

$('#reset').on('click', function() {
    loseScore++
    $('#losses').text('Losses: ' + loseScore)
    reset()
})

$('#restart').on('click', function() {
    totalScore = 0
    $('#running-total').text(totalScore)
    let percent = (totalScore/targetTotal)*100
    let fill = 100-percent + "%"
    $('#graph-background').css('height', fill)
})

function gameCheck () {
    if (totalScore === targetTotal) {
        win()
    } else if (totalScore > targetTotal) {
        lose ()
    }
}
    