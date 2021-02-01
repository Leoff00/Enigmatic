let questions = [
    'Sou o pais com o rio mais poluido do mundo',
    'Sou o pais onde nasceu o samba',
    'A mente mais brilhante do seculo XX',
    'Um jogo onde quem construir e atirar mais ganha',
    'Sou uma personagem de LOL cujo nome se assemelha a lua',
]


let stages = [
    "India",
    "Brasil",
    "Albert Einstein",
    "Fortnite",
    "Diana",
]

function show() {
    let question = document.querySelector('#question')

    

    let answer = document.querySelector('#answer');
    let sa = document.querySelector('#position');
    let capture = '';

    capture = document.querySelector('#data').value

    //verificar se a primeira resposta é correta e assim
    //passar para a proxima resposta, sucetivamente.

    for (let i = 0; i < stages.length; i++) {
        if (capture === stages[i]) {
            answer.innerHTML = 'Certa resposta'
            capture == stages[i++]
            sa.innerHTML = stages[i]
        }

    }

    

    //Mostrar uma nova pergunta conforme as respostas forem validadas

    for (let j = 0; j < questions.length; j++) {
    }


    //verificar se ha um campo em branco no input
    if (capture.length === null ||
        capture.length === undefined ||
        capture === '') {
        alert("Digite uma resposta valida, por favor")
    }
}