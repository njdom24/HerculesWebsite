var audio;
function evaluateQuiz()
{
    let nodes = document.querySelectorAll("form");

    let numRight = 0;
    let answers = [
    nodes[0][2].checked,
    nodes[1][3].checked,
    nodes[2][1].checked,
    nodes[3][0].checked,
    nodes[4][0].checked,
    ];

    for(let i = 0; i < answers.length; i++)
        if(answers[i])
            numRight++;
    if(numRight == 1)
        document.getElementById("corrects").innerHTML = "You got " + numRight + " answer correct!";
    else
    document.getElementById("corrects").innerHTML = "You got " + numRight + " answers correct!";

    audio = new Audio('Res/Megalovania.mp3');
    audio.play();

    let n = document.getElementsByClassName("content")[0].style;
    n.backgroundImage = "url(Res/sans.gif)";
}

function resetQuiz()
{
    let nodes = document.querySelectorAll("form");
    document.getElementsByClassName("content")[0].style.backgroundImage = null;
    audio.pause();
    for(let n = 0; n < nodes.length; n++)
        for(let p = 0; p < nodes[n].length; p++)
            nodes[n][p].checked = false;
}