let perguntas = [];
let indice = 0;
let acertos = 0;
let respostaSelecionada = null;

fetch("perguntas/matematica/questoes.json")
.then(res => res.json())
.then(data => {
    perguntas = data;
    carregarPergunta();
});

function carregarPergunta(){

    const p = perguntas[indice];

    document.getElementById("imagem").src = p.imagem;
    document.getElementById("pergunta").innerText = p.pergunta;

    const alternativas =
        document.getElementById("alternativas");

    alternativas.innerHTML = "";

    p.alternativas.forEach((texto, i)=>{

        const btn =
            document.createElement("button");

        btn.className = "alternativa";

        btn.innerText = texto;

        btn.onclick = ()=>{

            respostaSelecionada = i;

            document
                .querySelectorAll(".alternativa")
                .forEach(b => b.style.background="#ececec");

            btn.style.background="#90caf9";
        };

        alternativas.appendChild(btn);
    });
}

function proximaPergunta(){

    if(respostaSelecionada === null){
        alert("Escolha uma alternativa.");
        return;
    }

    if(
        respostaSelecionada ===
        perguntas[indice].correta
    ){
        acertos++;
    }

    respostaSelecionada = null;
    indice++;

    if(indice < perguntas.length){
        carregarPergunta();
    }else{
        mostrarResultado();
    }
}

function mostrarResultado(){

    document.getElementById("quiz").style.display="none";

    document.getElementById("resultado").style.display="block";

    const percentual =
        ((acertos/perguntas.length)*100).toFixed(0);

    document.getElementById("nota").innerHTML=
        `
        Acertos: ${acertos}<br>
        Total: ${perguntas.length}<br>
        Nota: ${percentual}%
        `;
}