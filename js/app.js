/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

// ter inspiratie deze links gebruikt:
// https://stackoverflow.com/questions/54015176/combat-system-for-a-javascript-jquery-rpg-game-timers
// https://www.codecademy.com/forum_questions/532a1aea9c4e9d275a003f26
// https://www.freecodecamp.org/news/learning-javascript-by-making-a-game-4aca51ad9030/

//Const en Let gebruikt omdat ik naast dit vak ook nog een curses volg op UDEMY: https://www.udemy.com/share/102gjmAEMTdVpbQn8B/
//Const is vast wordt nooit veranderd!
//Let is los denk aan var, Let mag veranderen.

console.log('\n---Loaded---\n\n');

//Timeout, gebruik dit wat in mn app handig om een vaste waarde te hebben
const timeOut = 3000; //ms = 3s

const attackEventEen = document.querySelector('#attack1');
const attackEventTwee = document.querySelector('#attack2');
const attackEventDrie = document.querySelector('#attack3');

const enemyHPContainer = document.querySelector('.enemyHP');
const playerHPContainer = document.querySelector('.playerHP');
const submit = document.getElementsByName('submit');
const battleText = document.querySelector('.battleText');
const resetButton = document.querySelector('#reset');
const playerHpBar = document.querySelector('#healthPlayer')
const enemyHPBar = document.querySelector('#healthEnemy');

let playerHP = 50;
let enemyHP = 50;

//Moet eerst ingeladen worden om te laten zien hoeveel HP je hebt op het begin
playerHPContainer.innerHTML = 'Naam HP: ' + playerHP;
enemyHPContainer.innerHTML = 'Enemy HP: ' + enemyHP;

//Event listeners
attackEventEen.addEventListener("click", attackEen);
attackEventTwee.addEventListener("click", attackTwee);
attackEventDrie.addEventListener("click", attackDrie);
resetButton.addEventListener("click", resetGame);

//Event handlers
function attackEen() {
    event.preventDefault();
    battle(1);
}

function attackTwee() {
    event.preventDefault();
    battle(2);
}

function attackDrie() {
    event.preventDefault();
    battle(3);
}

//Player attack function, deze functie zorgt ervoor dat de player kan aanvallen.
function battle(attack) {
    let attackDamage = attackStyle(attack);
    if (attackDamage > 0) {
        enemyHP -= attackDamage;
        enemyHPBar.value -= attackDamage;
        battleText.style.color = 'white';
        battleText.innerHTML = 'You damaged the enemy for: ' + attackDamage;
        //Als de enemy geen HP meer heeft is het spel af je hebt gewonnen
        if (enemyHP <= 0) {
            enemyHP = 0;
            battleText.style.color = 'white';
            battleText.innerHTML = 'You won! congratz!';
            resetButton.style.display = 'block';
            //Function afbreken want het spel is af geen levens meer
            return;
        }
        refreshEnemyStats(enemyHP);
        enemyTurn();
    } else {
        battleText.style.color = 'white';
        battleText.innerHTML = 'You"ve missed the enemy, better luck next time!';
        refreshEnemyStats(enemyHP);
        enemyTurn();
    }
}

//Enemy attack function, soort van AI, attack wordt random gekozen.
function enemyTurn() {
    for (let i = 0; i < submit.length; i++) {
        submit[i].disabled = true;
    }
    setTimeout(() => {
        let attack = Math.floor(Math.random() * (3 - 1) + 1);
        let attackType = attackStyle(attack);
        if (attackType > 0) {
            playerHP -= attackType;
            playerHpBar.value -= attackType;
            //Battletext
            battleText.style.color = '#ff4c4c';
            battleText.innerHTML = 'The enemy damaged you for: ' + attackType + ' Your turn...';
            //Je hebt geen HP meer dus verloren.
            if (playerHP <= 0) {
                playerHP = 0;
                //Battletext
                battleText.style.color = '#ff4c4c';
                battleText.innerHTML = "You've lost better luck next time";
                resetButton.style.display = 'block';
                //Function afbreken want het spel is af geen levens meer
                return;
            }
            refreshPlayerStats(playerHP);
        } else {
            //Battletext
            battleText.style.color = '#ff4c4c';
            battleText.innerHTML = 'The enemy has missed you! Your turn...';
            refreshPlayerStats(playerHP);
        }
        for (let i = 0; i < submit.length; i++) {
            submit[i].disabled = false;
        }
    }, timeOut);
}

//De drie attacks die in mijn programma staan, allemaal verschillende voordelen
function attackStyle(attack) {
    //accuracy tot 10 dus tot 100%
    let accuracy = Math.floor(Math.random() * (10 - 1) + 1);
    switch (attack) {
        //Meer accuracy lage damage
        case 1:
            //90% kans
            if (accuracy >= 1) {
                let damage = Math.floor(Math.random() * (4 - 2) + 2);
                return damage;
            } else {
                return 0;
            }
            break;
            //Meer damage lage accuracy
        case 2:
            //20% kans
            if (accuracy >= 8) {
                let damage = Math.floor(Math.random() * (20 - 15) + 15);
                return damage;
            } else {
                return 0;
            }
            break;
            //Overall goede damage/accuracy
        case 3:
            //60% kans
            if (accuracy >= 4) {
                let damage = Math.floor(Math.random() * (7 - 5) + 5);
                return damage;
            } else {
                return 0;
            }
            break;
    }
}

function refreshPlayerStats(player) {
    if (player <= 10) {
        playerHPContainer.style.color = '#b30000';
    } else if (player <= 25) {
        playerHPContainer.style.color = '#f9d71c';
    }
    playerHPContainer.innerHTML = 'Naam HP: ' + player;
}

function refreshEnemyStats(enemy) {
    if (enemy <= 10) {
        enemyHPContainer.style.color = '#b30000';
    } else if (enemy <= 25) {
        enemyHPContainer.style.color = '#f9d71c';
    }
    enemyHPContainer.innerHTML = 'Enemy HP: ' + enemy;
}

function resetGame() {
    location.reload();
}