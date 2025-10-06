//punteros a el HTML
const body = document.body;
const startscreen = document.getElementById("startscreen")
const question_display =  document.getElementById("questions")
const answer_display = document.getElementById("answer")
const question_history_nav = document.getElementById("question_history_nav")
//Event Listeners
body.addEventListener("click", function(){
    startscreen.style.display = 'none';
    
})

//Resto del code
initialisation();

async function loadjson() {
    const response = await fetch('./json/question.json');
    const jsondata = await response.json();
    return jsondata;
}

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}

async function initialisation() {
    let questions = await loadjson();
    questions = questions.questions;
    questions.forEach((element,index) => {
        question_history_nav.innerHTML += `<div id="${index}">${index+1}</div>`
    })
    question_history_nav.childNodes.forEach((elements, index) => function(){
        elements.addEventListener("click", history(index, questions))
    })

    shuffle(questions);
    game(0, questions);
}


async function game(question_index, questions) {
    let options = questions[question_index].options;
    let question = questions[question_index].question;
    console.log("Game:");
    console.log(question_index)
    console.log(questions);
    console.log("-End of Game-");
    showquestions(options, question, question_index);

    document.querySelectorAll(".q").forEach((element, index) =>{
        element.addEventListener("click", function(){
            check(index, questions, question_index);
        })
    })
}

function showquestions(questions, answer, answer_num = 0){
    answer_display.innerHTML = `Pregunta ${answer_num+1}: ${answer}`
    /*
    document.querySelectorAll(".questions span:not(.letter)").forEach((element, index) => {
        element.innerHTML = questions[index];
    })
    */
    
    question_display.innerHTML = `
        <div class="q" id="a">
            <span class="letter">·A:</span>${questions[0]}
        </div>
        <div class="q" id="b">
            <span class="letter">·B:</span>${questions[1]}
        </div>
        <div class="q" id="c">
            <span class="letter">·C:</span>${questions[2]}
        </div>
        <div class="q" id="d">
            <span class="letter">·D:</span>${questions[3]}
        </div>
    `;
    
}

function history(question_index, questions){
    console.log(questions)
    let options = questions[question_index].options;
    let question = questions[question_index].question;
    showquestions(options, question, question_index);
}

async function check(answer, questions, question_index) {
    console.log("answer: "+ answer);
    console.log("index: " + question_index);
    console.log("Respuesta correcta: " + questions[question_index].correct_answer);
    console.log("Respuesta Obtenida: " + questions[question_index].options[answer])
    if(questions[question_index].options[answer] == questions[question_index].correct_answer){
        console.log("Bien");
        document.querySelector(`.question_history_nav [id='${question_index}']`).style.backgroundColor = "#004D3B";
    }else{
        console.log("Mal");
         document.querySelector(`.question_history_nav [id='${question_index}']`).style.backgroundColor = "#FF0000";
    }
    questions[question_index].user_response = questions[question_index].options[answer];
    let new_question_index = question_index + 1;
    game(new_question_index, questions);
}



