window.onload=function() {
  var myQuestions = [{
      question: "In ce an sa nascut Angela Hondru?",
      answers: {
        a: ['1945', false],
        b: ['1944', true],
        c: ['1946', false]
      },
    },
    {
      question: "What is 30/3?",
      answers: {
        a: ['3', false],
        b: ['5', false],
        c: ['10', true]
      },
    }
  ];

  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');

  generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

  function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
      var output = [];
      var answers;

      for (var i = 0; i < questions.length; i++) {
        answers = [];
        var letter;
        for (letter in questions[i].answers) {
          answers.push(
            '<label>'
            + '<input type="checkbox" name="question' + i + '" value="' + letter + '">'
            + letter + ': '
            + questions[i].answers[letter][0]
            + '</label>'
          );
        }

        output.push(
          '<div class="question">' + questions[i].question + '</div>'
          + '<div class="answers">' + answers.join('') + '</div>'
        );
      }
      quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer) {
      var answerContainers = quizContainer.querySelectorAll('.answers');
      var userAnswer = [];
      var numCorrect = 0;

      for (var i = 0; i < questions.length; i++) {
        var lg = answerContainers[i].querySelectorAll('input[name=question' + i + ']:checked').length;
        for (var j = 0; j < lg; j++)
          userAnswer.push(answerContainers[i].querySelectorAll('input[name=question' + i + ']:checked')[j].defaultValue);
        console.log(userAnswer);
        var corect = 1;
        for (var j = 0; j < lg; j++)
          if (!questions[i].answers[userAnswer[j]][1]) corect = 0;
        if (lg != 0 && corect) {
          numCorrect++;
          answerContainers[i].style.color = 'lightgreen';
        } else {
          answerContainers[i].style.color = 'red';
        }
        for (letter in questions[i].answers)
          document.getElementsByName('question' + i)[letter.charCodeAt(0) - 97].disabled = true;
      }

      resultsContainer.innerHTML = numCorrect + ' din ' + questions.length;
    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function () {
      showResults(questions, quizContainer, resultsContainer);
    }

  }
    
}
