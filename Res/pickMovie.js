function NewMovie()
{
    if(document.getElementById("MovieResult").innerHTML != "Hercules!")
    {
        let num = Math.floor(Math.random() * 11);//0-10
        if(num > 9)//10% chance
        {
            let n = document.getElementsByClassName("content");
            n[0].style.backgroundImage = "url(Res/confetti.gif)";
            n[1].style.backgroundImage = "url(Res/confetti.gif)";
            document.getElementsByClassName("movie")[0].style.opacity = 0.7;
            
            document.getElementById("MovieResult").innerHTML = "Hercules!";
        }
        else
            document.getElementById("MovieResult").innerHTML = "The Emoji Movie!";
    }
}