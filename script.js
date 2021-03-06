
// Массив английских слов с переводами 
    
var words = [];
    
words[0] = {
    origin: "to run",
    translate: "бежать"
}
words[1] = {
    origin: "to go",
    translate: "идти"
}
words[2] = {
    origin: "to jump",
    translate: "прыгать"
}
words[3] = {
   origin: "to fly",
   translate: "летать"
}
words[4] = {
   origin: "to swim",
   translate: "плавать"
}
words[5] = {
   origin: "to drive",
   translate: "ехать"
}
words[6] = {
   origin: "to stand",
   translate: "стоять"
}
words[7] = {
   origin: "to lie",
   translate: "лежать"
}
words[8] = {
   origin: "to sit",
   translate: "сидеть"
}
words[9] = {
   origin: "to crawl",
   translate: "ползать"
}

var len = words.length; // Длина массива библиотеки

var randIndex = 1;

var count = 1; // Счетчик переведённых слов

var usedWords = []; 

var timerID;

var elIndex = 0; // Индекс элемента в статусбаре

var correctAnswer = 0; // Считает правильные ответы

var stBar = []; // Строковый массив элементов по id ("$('el0')").

var stBar2;     // Нормальный массив элементов статусбара $('el0').

//////////////////////////////////////////////////////////////////////////////


// Запись использованных слов в массив
function addInUsed () {
usedWords.push(words[randIndex].origin);
return;
}

//Наполнение массивов элементами статусбара (количество элементов зависит от количества слов в библиотеке).

function stBarFilling (len) {
for (var f = 0; f <= len; f++) {
    stBar.push("$('#el"+ f + "')");
}
    stBar2 = stBar.map(function(item) {
    var id = item.slice(3, -2);
    return $(id);
    });
return;
}

// StatusBar
// Отрисовка элементов статусбара и присвоение им id и class
function statusBar () {
for (var j = 0; j < len; j++) {
    $('#statusbar').append("<div class='element'></div>");
    var g = 0;
        $('.element').each(function() {
        $(this).attr("id","el"+g);
        g++;
    });
    
}       
}

// Изменение внешнего вида элементов статусбара
function statusElChange () {
stBar2[elIndex].next().addClass('curElement');
elIndex++;
}

// Отсрочка функции
function delayedFunc(func) {
timerID = window.setTimeout(func, 2000);
}

// Конец урока, вывод поздравления.
function end() {
$('#page1').prop('hidden', true);
$('#congrats').prop('hidden', false);
$('#result').text(correctAnswer);
$('#howManyWords').text(len);
return;
}

// выбирает случайное слово и выводит на экран
function randomWord () {
randIndex = Math.floor(Math.random() * len);
return randIndex;  
}

function checkRepeat () {

if (count !== len) {
    for (var i = 0; i <= usedWords.length; i++) {

            if (usedWords[i] === words[randIndex].origin) {
                randomWord ();// выбирает случайное слово и выводит на экран
                return checkRepeat(randIndex);
            }        
    }
    $('#questWord').html(words[randIndex].origin);
    nextWord();
    count++;
} else {
    end();
}
}

// Вывод следующего слова
function nextWord() {
$('#resultTrue').prop('hidden', true);  // скрывает "Верно!" 
$('#translateInput').val(''); //очищает  поле ввода
$('#resultFalse').prop('hidden', true); // скрывает "Не верно!"
$('#trButton').prop('hidden', false); // скрывает кнопку Проверить
$('#translateInput').prop('disabled', false); // разблокирует поле ввода
$('#translateInput').focus(); // ставит курсор в поле ввода
$('#empty').prop('hidden', true); // скрывает "Введи перевод"

}

// Проверка ответа
function check () {
  // Если перевод верный
if ($('#translateInput').val() === words[randIndex].translate) {   
    $('#resultTrue').prop('hidden', false);
    $('#resultFalse').prop('hidden', true); 
    addInUsed ();
    correctAnswer++;
    delayedFunc(checkRepeat); // задержка вывода следующего слова
    delayedFunc(statusElChange);  
            

} else {    // Если перевод не верный
    addInUsed ();
    $('#resultFalse').prop('hidden', false);
    $('#trButton').prop('hidden', false);
    delayedFunc(checkRepeat);
    delayedFunc(statusElChange);
    $('#empty').prop('hidden', true);
    $('#translateInput').val('');
            

    }
}


// Запуск теста

function testYourSelf () {
   $('#new').prop('hidden', true);
   $('#testPage').prop('hidden', false);
   stBarFilling (len);
   $('#statusbar').children().removeClass('curElement');
   $('#el0').addClass('curElement');
   correctAnswer = 0;
   elIndex = 0;
   // Вывод нового английского слова из массива 
   randomWord ();
   $('#questWord').html(words[randIndex].origin);
   $('#resultTrue').prop('hidden', true);
   $('#resultFalse').prop('hidden', true);
   $('#translateInput').prop('disabled', false);
   $('#translateInput').focus();
   $('#trButton').prop('hidden', false);
}
//////////////////////////////////////////////////////////////////////////////     


// Отрисовка блоков со словами и присвоение им id и class 
function drawWordBlocks () {
for (var i = 0; i < len; i++) {
    $('#learn').append("<div class='block'><div class='wordBlockOrigin'></div><div class='wordBlockTranslate'></div></div>");
    var g = 0;
        $('.wordBlockOrigin').each(function() {
            $(this).attr("id","blockOrigin"+g);
            g++;
        })
    var j = 0;
        $('.wordBlockTranslate').each(function() {
            $(this).attr("id","blockTranslate"+j);
            j++;
        })   
}
return;
}


// Наполнение блоков словами

function wordBlockFilling () {
for (var i = 0; i < len; i++) {
    $('#blockOrigin'+i).text(words[i].origin);
    $('#blockTranslate'+i).text(words[i].translate);
    
}
}

///////////////////////////////////////////////////////////////////////////////
$('document').ready(function() {
            
// Нажатие на кнопку Start
$('#start').on('click', function() {
    $("#start").hide();
    $("#understart").hide();
    $('#new').prop('hidden', false);
});

// Выбор урока №1
$('#testYourSelf').on('click', function() {
   testYourSelf ();
})

// Создание статусбара
statusBar ();

// Кнопка ПРОВЕРИТЬ
$('#trButton').on('click', function() {
    $('#empty').prop('hidden', true);

        if ($('#translateInput').val() === '') {
            $('#empty').prop('hidden', false);

            } else {
                $('#translateInput').prop('disabled', true);
                check();
                $('#trButton').prop('hidden', true); 
            }
});

// Нажатие Enter после ввода ответа в input            
$('#translateInput').keyup(function(event) {
    $('#empty').prop('hidden', true);     
    if (event.keyCode == 13) {
        if ($('#translateInput').val() === '') {
            $('#empty').prop('hidden', false);
        } else {
            $('#translateInput').prop('disabled', true);
            check();
            $('#trButton').prop('hidden', true); 
        }
    }
});
   
// На главную    
$('#home').on('click', function() {
    $('#congrats').prop('hidden', true);
    $('#new').prop('hidden', false);
    $('#learnWords').prop('hidden', false);
    $('input').val('');
    correctAnswer = 0;
    count = 1;
    usedWords = [];
    randIndex = 1;

});

$('#learnWords').click(function() {
    $('#new').prop('hidden', true);
    $('#learn').prop('hidden', false);
    $('#testPage').prop('hidden', true);
    drawWordBlocks();
    wordBlockFilling();
})

$('#getTest').click(function() {
    $('#learnWords').prop('hidden', true);
    testYourSelf ();
    $('#learn').prop('hidden', true);
    $('#trButton').prop('hidden', false);
    $('.block').remove();
    //$('.wordBlockTranslate').remove();
    
})

$('#backToLearn').click(function() {
    $('#new').prop('hidden', true);
    $('#learn').prop('hidden', false);
    $('#testPage').prop('hidden', true);
    $('.block').remove();
    drawWordBlocks();
    wordBlockFilling();
})

});
    


