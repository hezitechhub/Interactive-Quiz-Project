
//it would be nice to have these quetions generated from the database, using a sweet framework, springboot and mysql database
var quiz = {
    "JS": [
        {
            "id": 1,
            "question": "Inside which HTML element do we put the JavaScript?",
            "options": ["&lt;script&gt;", "&lt;javascript&gt;", "&lt;scripting&gt;", "&lt;js&gt;"],
            "answer": "&lt;script&gt;",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "Where is the correct place to insert a JavaScript?",
            "options": ["The &lt;head&gt; section", "The &lt;body&gt; section", "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"],
            "answer": "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
            "score": 0,
            "status": ""
        },
        {
            "id": 3,
            "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
            "options": ["&ltscript href=&quot;xxx.js&quot;", "&lt;script name=&quot;xxx.js&quot;", "&lt;script src=&quot;xxx.js&quot;"],
            "answer": "&lt;script src=&quot;xxx.js&quot;",
            "score": 0,
            "status": ""
        },
        {
            "id": 4,
            "question": "The external JavaScript file must contain the &lt;script&gt; tag.",
            "options": ["True", "False"],
            "answer": "False",
            "score": 0,
            "status": ""
        },
        {
            "id": 5,
            "question": "How do you write &quot;Hello World&quot; in an alert box?",
            "options": ["alertBox(&quot;Hello World&quot;);", "msg(&quot;Hello World&quot;);", "alert(&quot;Hello World&quot;);", "msgBox(&quot;Hello World&quot;);"],
            "answer": "alert(&quot;Hello World&quot;);",
            "score": 0,
            "status": ""
        },
        // Additional Questions that have added, asaph zulu
        {
            "id": 6,
            "question": "What is the result of 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "answer": "4",
            "score": 0,
            "status": ""
        },
        {
            "id": 7,
            "question": "Which keyword is used to declare a variable in JavaScript?",
            "options": ["var", "let", "const", "variable"],
            "answer": "var",
            "score": 0,
            "status": ""
        },
        {
            "id": 8,
            "question": "What does 'HTML' stand for?",
            "options": ["Hyperlink Text Markup Language", "Hyper Text Makeup Language", "Hyper Text Markup Language", "Highly Text Markup Language"],
            "answer": "Hyper Text Markup Language",
            "score": 0,
            "status": ""
        },
        {
            "id": 9,
            "question": "Which event is triggered when a user clicks a button?",
            "options": ["onmouseover", "onchange", "onclick", "onsubmit"],
            "answer": "onclick",
            "score": 0,
            "status": ""
        },
        {
            "id": 10,
            "question": "What is the result of '5' + 3 in JavaScript?",
            "options": ["8", "53", "5+3", "NaN"],
            "answer": "53",
            "score": 0,
            "status": ""
        }
    ]
}

var quizApp = function () {
    this.score = 0;
    this.qno = 1;
    this.currentque = 0;
    var totalque = quiz.JS.length;

    this.displayQuiz = function (cque) {
        this.currentque = cque;
        if (this.currentque < totalque) {
            
            $("#qno").html(quiz.JS[this.currentque].id);
            $("#tque").html(totalque);

           
            $("#previous").prop("disabled", this.currentque <= 0);
            $("#next").prop("disabled", this.currentque >= totalque);

            
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");

            for (var i = 0; i < quiz.JS[this.currentque].options.length; i++) {
                // am displaying options as radio buttons
                $("#question-options").append(
                    `<div class='form-check option-block'>
                        <label class='form-check-label'>
                            <input type='radio' class='form-check-input' name='option' id='q${i}' value='${quiz.JS[this.currentque].options[i]}'>
                            <span class='optionval'>${quiz.JS[this.currentque].options[i]}</span>
                        </label>
                    </div>`
                );
            }
        }

        if (this.currentque >= totalque) {
            
            for (var i = 0; i < totalque; i++) {
                this.score += quiz.JS[i].score;
            }
            return this.showResult(this.score);
        }
    }

    this.showResult = function (scr) {
     
        $("#result").addClass('result');
        $("#result").html(`<h1 class='res-header'>Total Score: &nbsp;${scr}/${totalque}</h1>`);

        for (var i = 0; i < totalque; i++) {
            var res;
            if (quiz.JS[i].score === 0) {
                res = `<span class='wrong'>${quiz.JS[i].score}</span><i class='fa fa-remove c-wrong'></i>`;
            } else {
                res = `<span class='correct'>${quiz.JS[i].score}</span><i class='fa fa-check c-correct'></i>`;
            }

            $("#result").append(
                `<div class='result-question'>
                    <span>Q ${quiz.JS[i].id}</span> &nbsp;${quiz.JS[i].question}
                </div>
                <div><b>Correct answer:</b> &nbsp;${quiz.JS[i].answer}</div>
                <div class='last-row'><b>Score:</b> &nbsp;${res}</div>`
            );
        }
    }

    this.checkAnswer = function (option) {
        
        var answer = quiz.JS[this.currentque].answer;
        option = option.replace(/</g, "&lt;"); // Sanitizing the option here
        if (option === answer) {
            if (quiz.JS[this.currentque].score === 0) {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
        }
    }

    this.changeQuestion = function (cque) {
        
        this.currentque += cque;
        this.displayQuiz(this.currentque);
    }
}

var jsq = new quizApp();

$(document).ready(function () {
    
    jsq.displayQuiz(0);

    $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
        
        jsq.checkAnswer($(this).val());
    });
});

$('#next').click(function (e) {
    e.preventDefault();
    var selectedRadio = $('input[name=option]:checked');
    if (selectedRadio.length) {
        selectedopt = selectedRadio.val();
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(1);
});


$('#previous').click(function (e) {
    e.preventDefault();
    if (selectedopt) {
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(-1);
});
