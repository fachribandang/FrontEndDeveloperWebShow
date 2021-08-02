// sumber : https://www.codeexplained.org/2018/10/create-multiple-choice-quiz-using-javascript.html
// hanya sebagai fitur tambahan , terdapat beberapa sedikti perbahan
var myQuestions = [
    {
      question: "Pilih cara baca dari kanji 私 ",
      answers: {
        a: 'わたし',
        b: 'あなた',
        c: 'ぼく'
      },
      correctAnswer: 'a'
    },
    {
      question: "Pilih cara baca dari kanji 戦場 ",
      answers: {
        a: 'せんたく',
        b: 'せんじょう',
        c: 'せんせい'
      },
      correctAnswer: 'ｂ'
    },
    {
      question: "Pilih cara baca dari kanji 奪う ",
      answers: {
        a: 'うばう',
        b: 'すくう',
        c: 'かまう'
      },
      correctAnswer: 'a'
    },
    {
      question: "Pilih cara baca dari kanji 予想 ",
      answers: {
        a: 'よそう',
        b: 'ばんそう',
        c: 'そうぞう'
      },
      correctAnswer: 'a'
    },
    {
      question: "Pilih arti dari 科目 ",
      answers: {
        a: 'materi',
        b: 'komunikasi',
        c: 'mudah'
      },
      correctAnswer: 'a'
    },
    {
      question: "Pilih cara baca dari kanji 花束 ",
      answers: {
        a: 'matahari',
        b: 'kembang api',
        c: 'rangakaian bunga'
      },
      correctAnswer: 'c'
    }
  ];
  
  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  
  generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
  
  function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
  
    function showQuestions(questions, quizContainer){
      var output = [];
      var answers;
      for(var i=0; i<questions.length; i++){
        answers = [];
        for(letter in questions[i].answers){
          answers.push(
            '<label>'
              + '<input type="radio" name="question'+i+'" value="'+letter+'">'
              + letter + ': '
              + questions[i].answers[letter]
            + '</label> </br>'
          );
        }
        output.push(
          '<div class="question">'+ (i +1) +'. ' + questions[i].question + '</div>'
          + '<div class="answers">' + answers.join('') + '</div>'
        );
      }
      quizContainer.innerHTML = output.join('');
    }
  
  
    function showResults(questions, quizContainer, resultsContainer){
      var answerContainers = quizContainer.querySelectorAll('.answers');
      var userAnswer = '';
      var numCorrect = 0;
      for(var i=0; i<questions.length; i++){
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        if(userAnswer===questions[i].correctAnswer){
          numCorrect++;
          answerContainers[i].style.color = 'lightgreen';
        }
        else{
          answerContainers[i].style.color = 'red';
        }
      }
      resultsContainer.innerHTML = 'benar : ' + numCorrect + ', dari ' + questions.length;
    }
    showQuestions(questions, quizContainer);
    submitButton.onclick = function(){
      showResults(questions, quizContainer, resultsContainer);
    }
  }