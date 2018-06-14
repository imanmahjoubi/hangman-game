var wins = 0;
var losses = 0;

var maxErrors = 10;

var display_letters_elmnt = document.getElementById("display-letters");
var guessed_letters = document.getElementById("guessed-letters");
var errors_count = document.getElementById("errors");
var winning_count = document.getElementById("win-count");
var losing_count = document.getElementById("loss-count");


var guesses_letter = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var press_any_key_start = [
	" ___                                       _                _              _               _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___   ___| |_  __ _  _ _ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\ (_-<|  _|/ _` || '_||  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/ /__/ \\__|\\__,_||_|   \\__|",
	"                                    |__/             |__/                                      "
];
var press_any_key_reset = [
	" ___                                       _                _                              _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___    _ _  ___  ___ ___ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\  | '_|/ -_)(_-</ -_)|  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/  |_|  \\___|/__/\\___| \\__|",
	"                                    |__/             |__/                                      "
];

var you_win = [
	"__  __ ____   __  __   _      __ ____ _  __",
	"\\ \\/ // __ \\ / / / /  | | /| / //  _// |/ /",
	" \\  // /_/ // /_/ /   | |/ |/ /_/ / /    / ",
	" /_/ \\____/ \\____/    |__/|__//___//_/|_/  ",
	"                                           "
];
var you_lose = [
	"__  __ ____   __  __  __   ____   ____ ____",
	"\\ \\/ // __ \\ / / / / / /  / __ \\ / __// __/",
	" \\  // /_/ // /_/ / / /__/ /_/ /_\\ \\ / _/  ",
	" /_/ \\____/ \\____/ /____/\\____//___//___/  ",
	"                                           "
];
var empty_alert = [
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           "
];

var blinkElements = document.getElementsByClassName("animation");
var alertLineElements = document.getElementsByClassName("show-alert");
var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (guesses_letter.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

window.setInterval(function() {
	if (blinkElements.length > 0) {
		if (game.guessedLetters.length === 0 || game.gameOver) {
			if (blinkElements[0].style.opacity === "1") {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "0";

				}
			} else {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "1";
				}
			}
		} else {
			for (var i = 0; i < blinkElements.length; i++) {
				blinkElements[i].style.opacity = "0";
			}
		}
	}
}, 750);

function Hangman() {
	this.wordList = [
		"adele",
		"trump",
		"vladimir",
		"oprah",
		"brad",
		"will",
		"obama",
		"kanye",
		"kimjong",
		"beyonce"
	];



	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    var img = document.getElementById("img-stars");
    var img_src = "assets/images/"+this.word+".jpg";
    console.log(img_src);
    img.setAttribute("src",img_src);

    this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	this.alertLines = empty_alert;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "Assets/sounds/win.wav");

    this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.alertLines = you_lose;
		this.gameOver = true;
        audioElement.setAttribute("src", "Assets/sounds/game-over.wav");
        audioElement.play();
    }

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.alertLines = you_win;

            audioElement.play();

        this.gameOver = true;
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	display_letters_elmnt.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessed_letters.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errors_count.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winning_count.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	losing_count.textContent = tempString;

	for (var i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? press_any_key_reset[i] : press_any_key_start[i]);
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();
