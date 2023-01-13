const music = new Audio("music.mp3")
const audioTurn = new Audio("ting.mp3")
const gameover = new Audio("gameover.mp3")

let turn = "X"
let isgameover = false;
let gameovertune = 0;


// function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}
// function to check for a win
const checkwin=()=>{
    let boxes=document.getElementsByClassName("box");
    let win = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,45,135]
    ]
    win.forEach(e =>{
        if(boxes[e[0]].innerText===boxes[e[1]].innerText && boxes[e[1]].innerText===boxes[e[2]].innerText && boxes[e[0]].innerText!==''){
            let info=document.querySelector(".info")
            info.innerText = boxes[e[0]].innerText + " won";
            isgameover = true;
            document.getElementsByTagName("img")[0].style.width = "200px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            boxes[e[0]].style.background = "rgb(242, 234, 250)";
            boxes[e[1]].style.background = "rgb(242, 234, 250)";
            boxes[e[2]].style.background = "rgb(242, 234, 250)";
            if(gameovertune===0){
                gameovertune++;
                gameover.play();
            }
        }
    })
}

// game logic
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(Element =>{
    Element.addEventListener('click' , ()=>{
    if(!isgameover && Element.innerText===''){
        Element.innerText=turn;
        turn=changeTurn();
        audioTurn.play();
        if(!isgameover){
            checkwin();
        }
        if(!isgameover){
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
})
}
)
let reset = document.getElementById("reset");
reset.addEventListener("click" , ()=>{
    let boxes=document.getElementsByClassName("box");
    Array.from(boxes).forEach(element =>{
        element.innerText="";
        element.style.background = "white";
    })
    turn = "X";
    isgameover = false;
    document.getElementsByTagName('img')[0].style.width = "0px";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".line").style.width = "0";
    gameover.pause();
    gameovertune = 0;
})