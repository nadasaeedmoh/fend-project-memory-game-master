/*global document*/
/* global window */
/* jslint browser: true */
/* global $ , jQuery.fn */
/*
 * Create a list that holds all of your cards
 */

var cards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"], // to hold cards classes
    openedCard = [], // store the open cards
    moves = 0, // count moves onclick
    matched = 0,// count the number of matching
    time = {minutes: 0, secondes: 0, clear: -1}, // create time object
    stars = 3,
    cardClick = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    'use strict';
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* setCard()
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function drawCard() {
    'use strict';
    var randomizedCard = shuffle(cards),
        i;
    for (i = 0; i < randomizedCard.length; i = i + 1) {
        $('.deck').append('<li class=\"card\"><i class = \"fa fa-' + randomizedCard[i] + '\"></i></li>');
    }
}

/* matchCard() check whether the cards in the openedCard Array is identical or not */
function matchCard() {
    'use strict';
    if (openedCard[0].children().attr('class') === openedCard[1].children().attr('class')) {
        matched = matched + 1;
        openedCard[0].addClass('match');
        openedCard[1].addClass('match');
        openedCard = [];
        if (matched === 8) {
        /*won card appear*/
            window.setTimeout(function () {
                $('.win').addClass('view');
            }, 100); /* time changed from 300 to 150*/
        }
    } else {
        window.setTimeout(function () {
            $('.card').removeClass('show open');
            openedCard = [];
        }, 200);
        
    }
}

/* openCard() show the card on click*/
function openCard(target) {
    'use strict';
    if (!($(target).hasClass('open show'))) {
        $(target).addClass('open show');
        openedCard.push($(target));
        
        if (openedCard.length === 2) {
            matchCard();
            moves = moves + 1;
            $('.moves').text(moves);
        }
    }
    
    /* remove stars */
    if (moves === 10 || moves === 25 || moves === 40) {
        $('.fa-star').last().addClass('fa-star-o');
        $('.fa-star-o').last().removeClass('fa-star');
        stars = stars - 1;
        $('.num-stars').text(String(stars));
    }
}

/* startTime() assure time formate and the flow of time from seconds to minutes */
function startTime() {
    'use strict';
    if (cardClick > 0 && matched < 8) {
        if (time.secondes === 59) {
            time.minutes = time.minutes + 1;
            time.secondes = 0;
        } else {
            time.secondes = time.secondes + 1;
        }
    } else if (cardClick > 0 && matchCard === 8) {
        time.minutes = time.minutes;
        time.secondes = time.secondes;
    }
    /* making sure that the time formate appear correctly*/
    var correctFormate = "0";
    if (time.secondes < 10) {
        correctFormate += String(time.secondes);
    } else {
        correctFormate = String(time.secondes);
    }
    $('.timer').text(String(time.minutes) + ":" + correctFormate);

}

/* letsPlay() start the game */
function letsPlay() {
    'use strict';
    moves = 0;
    $('.moves').text(moves);
    matched = 0;
    drawCard();
    $('.card').click(function (e) {
        openCard(e.target);
        cardClick = cardClick + 1;
    });
    
    /* rest the time*/
    window.clearInterval(time.clear);
    time.minutes = 0;
    time.secondes = 0;
    $('.timer').text("0:00");
    time.clear = window.setInterval(function () {
        startTime();
    }, 1000);
    
}

/* resetPlay() used to reset the cards on pressing reset or play again button */
function resetPlay() {
    'use strict';
    openedCard = [];
    moves = 0;
    matched = 0;
    cardClick = 0;
    /* add stars */
    $(".fa-star-o").addClass("fa-star");
    $(".fa-star").removeClass("fa-star-o");
    stars = 3;
    $(".num-stars").text(String(stars));
    $('.card').remove();
    letsPlay();
    
}

window.onload = letsPlay();

$('.restart').click(function () {
    'use strict';
    resetPlay();
});

$('.play-again').click(function () {
    'use strict';
    window.setTimeout(function () {
        resetPlay();
        $('.win').removeClass('view');
    }, 100);
});
