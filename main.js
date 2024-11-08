const cardGame = () => {
  const easyCards = ['cat', 'dog', 'sun', 'car', 'tree', 'book', 'fish', 'rain', 'house', 'water', 'apple', 'sky'];
  const mediumCards = ['journey', 'mountain', 'nature', 'freedom', 'wisdom', 'language', 'victory', 'village', 'friendship', 'happiness', 'beauty', 'silence'];
  const hardCards = ['serendipity', 'ephemeral', 'oblivion', 'paradox', 'nostalgia', 'solitude', 'perseverance', 'melancholy', 'enigma', 'resilience', 'ambiguity', 'transcendence'];
  
  const easyDifficult = $('#easy');
  const mediumDifficult = $('#medium');
  const hardDifficult = $('#hard');

  const translations = {
    'cat': 'кіт',
    'dog': 'собака',
    'sun': 'сонце',
    'car': 'автомобіль',
    'tree': 'дерево',
    'book': 'книга',
    'fish': 'риба',
    'rain': 'дощ',
    'house': 'будинок',
    'water': 'вода',
    'apple': 'яблуко',
    'sky': 'небо',
  
    'journey': 'подорож',
    'mountain': 'гора',
    'nature': 'природа',
    'freedom': 'свобода',
    'wisdom': 'мудрість',
    'language': 'мова',
    'victory': 'перемога',
    'village': 'село',
    'friendship': 'дружба',
    'happiness': 'щастя',
    'beauty': 'краса',
    'silence': 'тиша',
  
    'serendipity': 'випадкова удача',
    'ephemeral': 'швидкоплинний',
    'oblivion': 'забуття',
    'paradox': 'парадокс',
    'nostalgia': 'ностальгія',
    'solitude': 'самотність',
    'perseverance': 'наполегливість',
    'melancholy': 'меланхолія',
    'enigma': 'загадка',
    'resilience': 'стійкість',
    'ambiguity': 'неоднозначність',
    'transcendence': 'трансцендентність'
  };

  $('input[name="difficulty"]').change(function() {
    $('#main-dictionary').css('display', 'flex')
  });

  function countRound(){
    wordsCount++;
    $('#currentCount').text(wordsCount)
  }
  function countRight(){
    rightCount++;
    $("#right-score").text(rightCount)
  }
  function countWrong(){
    wrongCount++;
    $("#wrong-score").text(wrongCount);
  }
  function getDifficultLength(){
    if (easyDifficult.prop('checked')){
      return easyCards.length;
    } else if (mediumDifficult.prop('checked')){
      return mediumCards.length;
    } else if (hardDifficult.prop('checked')){
      return hardCards.length;
    }
    return 0;
  }
  function getDifficultRandom(){
    if (easyDifficult.prop('checked')){
      return easyCards[Math.floor(Math.random() * easyCards.length)];
    } else if (mediumDifficult.prop('checked')){
      return mediumCards[Math.floor(Math.random() * mediumCards.length)];
    } else if (hardDifficult.prop('checked')){
      return hardCards[Math.floor(Math.random() * hardCards.length)];
    }
  }
  function getDifficult(){
    if (easyDifficult.prop('checked')){
      return easyCards;
    } else if (mediumDifficult.prop('checked')){
      return mediumCards;
    } else if (hardDifficult.prop('checked')){
      return hardCards;
    }
  }

  function getTranslation(word){
    return translations[word];
  }

  function showCard() {
    if (getDifficult().length === 0) {
      switch (true) {
        case(wrongCount === 0):
          $('#skill-level').text('прекрасний')
          $('#skill-word').text("ідеально знаєте англійську")
          break;
        case(rightCount === 0):
          $('#skill-level').text('дуже поганий')
          $('#skill-word').text("не знаєте англійську взагалі")
          break;
        case (rightCount > wrongCount):
          $('#skill-level').text("гарний")
          $('#skill-word').text("вумний")
          break;
        case (rightCount < wrongCount):
          $('#skill-level').text('поганий')
          $('#skill-word').text("тупенький")
          break;
        case(rightCount === wrongCount):
          $('#skill-level').text('задовільний')
          $('#skill-word').text("студент чну")
          break;
        default:
          break;
      }

      $('#card').text("Всі слова закінчилися!");
      $('#next').prop('disabled', true);
      $('#word').prop('disabled', true);
      $("#modal").css("display", 'block');
      setTimeout(() => {
        $('#modal').addClass('visible');
        $('#modal-content').addClass('visible');
      }, 1);
    }

    currentWord = getDifficultRandom();
    $('#card').text(currentWord);
  }
  
  $('input[name="difficulty"]').change(function() {
    wordsCount = 0;
    rightCount = 0;
    wrongCount = 0;
  
    $('#currentCount').text(wordsCount);
    $("#right-score").text(rightCount);
    $("#wrong-score").text(wrongCount);
  
    $("#totalCount").text(getDifficultLength())

    $('#card').css('transform', 'rotateY(90deg)')
    setTimeout(() => {
      $('#card').css('transform', 'rotateY(0deg)')
      showCard();
    }, 700);
  });

  $('#next').click(checkTranslate);
  $(document).keydown(function(event){
    if (event.key === 'Enter') {
      checkTranslate();
  }})

  let wordsCount = 0;
  let rightCount = 0;
  let wrongCount = 0;

  function checkTranslate(){
  const userWord = $('#word').val().toLowerCase();
  const translation = getTranslation(currentWord);
  $('#card').css('transform', 'rotateY(90deg)')
    if(userWord === translation){
      const index = getDifficult().indexOf(currentWord);
      getDifficult().splice(index, 1)
      console.log("Переклад спрацював");
      countRound();
      $('#word').val('');
      countRight();
    } else {
      userWord.trim()
      if(userWord === ""){
        console.log("Пропуск слова")
      } else if(userWord){
        const index = getDifficult().indexOf(currentWord);
        getDifficult().splice(index, 1);
        console.log("Неправильно уведене слово");
        countRound();
        $('#word').val('');
        countWrong();
      }
    }
    setTimeout(() => {
      $('#card').css('transform', 'rotateY(0deg)')
      showCard();
    }, 700);
  }
}
