$(document).ready(function(){
	// hides questions at beginning of game
	$("#main").hide();
	$("#end").hide();


	// questions that will be asked
	var questions = [{
		question: "Who was the first Disney princess?",
		choices: ["Cinderella", "Aurora", "Snow White", "Pocahontas"],
		correct: 2,
	},
	{	question: "How many years does the Genie say he has been trapped in the lamp?",
		choices: ["100 years", "500 years", "1,000 years", "10,000 years"],
		correct: 3,
	},
	{	question: "In 'The Little Mermaid,' who is NOT one of Triton’s daughter?",
		choices: ["Andrina", "Adora", "Attina", "Alana"],
		correct: 1,
	},
	{	question: "In 'Sleeping Beauty,' what is the name of Maleficent’s pet raven?",
		choices: ["Diablo", "Malum", "Mauvais", "Diable"],
		correct: 0,
	},
	{	question: "In 'The Sword in the Stone,' what is the name of Merlin’s pet owl?",
		choices: ["Aristotle", "Socrates", "Archimedes", "Plato"],
		correct: 2,
	},
	{	question: "What is the name of the organization Bernard and Miss Bianca work in 'The Rescuers'?",
		choices: ["The Rescue Aid Society", "The International Rescue Organization", "The Rescuers", "The Secret Helpers"],
		correct: 0,
	},
	{	question: "In 'Beauty and the Beast,' how many eggs does Gaston say he eats in order to stay 'roughly the size of barge'?",
		choices: ["Four Dozen", "Nine Dozen", "Seven Dozen", "Five Dozen"],
		correct: 3,
	},
	{	question: "In '101 Dalmatians,' how many puppies does Perdita give birth to?",
		choices: ["12", "15", "18", "21"],
		correct: 1,
	},
	{	question: "In 'Hercules,' Hades promised not to harm Megara if Hercules gave up his strength for how long?",
		choices: ["12 hours", "24 hours", "36 hours", "48 hours"],
		correct: 1,
	},
	{	question: "What does the matchmaker criticize Mulan for?",
		choices: ["Being too skinny", "Being too tall", "Having bad posture", "Having big feet"],
		correct: 0,
	}];

	// keps track of question player's in
	var qCounter = 0;
	var time = 8;
	var tCounter;
	var correct = 0;

	// starts the game
	function startGame(){
		// when start game button is clicked, it will hide it and display the first question
        $('#start').on('click', function(){
            $("#start").hide();
            displayQuestions();
            $("#main").show();
        })
    }
    
    // starts game when start button is clicked
    startGame();

    // function that displays questions & choices
    function displayQuestions(){

        //restarts countdown timer at each question
        stopwatch.stop();
        stopwatch.timer();
 		
 		// displays question and choices
        $("#questions").text(questions[qCounter].question);
		$("#answer0").text(questions[qCounter].choices[0]);
		$("#answer1").text(questions[qCounter].choices[1]);
		$("#answer2").text(questions[qCounter].choices[2]);
		$("#answer3").text(questions[qCounter].choices[3]);
    }

	// calls for next question
	function nextQuestion() {
		qCounter++;
		// clears previous selection
		$("input[name='choice']").prop("checked", false);

		// checks to see if qCounter is equal to 10
        if (qCounter == 10) {
	    	stopwatch.stop();
	        $("#main").hide();
	        $("#end").show();
	        $("#final-score").html("<h2>You got " + correct + " out of " + questions.length + " questions correct!");
        }

        //calls displayQuestions
        stopwatch.stop();
        displayQuestions();
    }

    // timer settings
	var stopwatch = {
		// decreases timer every second and display new time on html
		countdown: function () {
			time--;
			$("#stopwatch").html("<h2>Time Remaining: " + time + "</h2>");

			// if you run out of time, show correct answer and call next question
			if (time == 0) {
				$("#answer").html("The correct answer was " + questions[qCounter].choices[questions[qCounter].correct]);
	            stopwatch.stop();
	            nextQuestion();
	        }
		},
		// sets timer 
		timer: function() {
			// clearInterval(tCounter);
	        time = 8;
	        tCounter = setInterval(stopwatch.countdown, 1000);
		},
		// stops timer
		stop: function() {
			clearInterval(tCounter);
		}
	};

	function validate() {

		// when a choice is made
		$("input[type='radio']").click(function(){
    
		    // check if choice is correct/wrong
		    if ($(this).is(':checked')) {

		    	stopwatch.stop();

		    	// save the value of input choice in var answer
		    	var answer = ($("input[name='choice']:checked").val());
		    	console.log(answer);

		    	// check if answer is correct
		    	if (answer == questions[qCounter].correct) {
		    		// if correct, display text & move to next question
		    		correct++;
					$("#answer").html(questions[qCounter].choices[answer] + " is the correct answer!");
					nextQuestion(); // display next question
				} else {
					// if incorrect, cisplay corrext answer & move to next question
					$("#answer").html("Wrong Answer! The correct answer was " + questions[qCounter].choices[questions[qCounter].correct]);
					nextQuestion(); // display next question
				}
			}
		})
	}

	// calls for function to check if answer is correct/incorrect
	validate();

	function playAgain() {
        $("#play-again").on('click', function(){
            reset();
            $("#end").hide();
            $("#main").show();
            displayQuestions();
        });
    }
 playAgain();
    //resets variables
    function reset() {
        qCounter = 0;
        correct = 0;
    }
})