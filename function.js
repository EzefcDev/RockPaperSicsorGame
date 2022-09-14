const dataPoint = [
  "img/counter0.png",
  "img/counter1.png",
  "img/counter2.png",
  "img/counter3.png",
  "img/counter4.png",
  "img/counter5.png",
  "img/counter6.png",
  "img/counter7.png",
  "img/counter8.png",
  "img/counter9.png",
];

const dataImage = [
  "img/piedra.png",
  "img/papel.png",
  "img/tijera.png",
  "img/cara.png",
  "img/sadFace.png",
];
const dataImagePc = [
  "img/piedraPc.png",
  "img/papelPc.png",
  "img/tijeraPc.png",
  "img/carapc.png",
];

const playerPoint = document.querySelector("#counterPlayer");
const pcPoint = document.querySelector("#counterPc");
const clickPlayer = document.querySelector("#counterPlayer");
const playerChange = document.querySelector("#playerImg");
const pcChange = document.querySelector("#pcImg");
const textPlayer = document.querySelector("#textplayer");
const textPc = document.querySelector("#textpc");
const textTie = document.querySelector("#texttie");
const startGame = document.querySelector("button");
const newLabel = document.querySelector("#buttonreturn");

let iPointer = 0;
let iPointerPc = 0;
let iSelector = 0;
let win = 0;
let winPc = 0;
let enableStart = true;
let enableFace = true;

const point = (winPlayer, pcWin) => {
  iPointer = winPlayer;
  iPointerPc = pcWin;
  if (iPointer < 10) {
    playerPoint.src = dataPoint[iPointer];
    if (iPointer === 10) {
      iPointer = 0;
      playerPoint.src = dataPoint[iPointer];
    }
  }
  if (iPointerPc < 10) {
    pcPoint.src = dataPoint[iPointerPc];
    if (iPointerPc === 10) {
      iPointerPc = 0;
      pcPoint.src = dataPoint[iPointerPc];
    }
  }
};

const selectObjet = (event) => {
  const click = event.target.id;
  if (click && iSelector < 3 && enableFace) {
    enableStart = false;
    iSelector++;
    playerChange.src = dataImage[iSelector];
    if (iSelector === 3) {
      iSelector = 0;
      playerChange.src = dataImage[iSelector];
    }
  }
};

const finish = (event) => {
  win = 0;
  winPc = 0;
  point(win, winPc);
  enableStart = true;
  enableFace = true;
  playerChange.src = dataImage[3];
  pcChange.src = dataImagePc[3];
  textPlayer.textContent = "TO SELECT";
  const returnGame = document.querySelector("#return");
  returnGame.remove();
};

const recycle = () => {
  textPc.textContent = "";
  textTie.textContent = "";
  newLabel.innerHTML = `<button id="return"><span class="button_top">RETURN</span></button>`;
  const returnGame = document.querySelector("#return");
  returnGame.addEventListener("click", finish);
};

const whatIsTheWinner = (player, pc) => {
  enableFace = false;
  enableStart = true;
  if (player && !pc) {
    playerChange.src = dataImage[3];
    pcChange.src = dataImage[4];
    textPlayer.textContent = "WINNER";
  } else {
    playerChange.src = dataImage[4];
    pcChange.src = dataImage[3];
    textPlayer.textContent = "Loser";
  }
  recycle();
};

playerChange.addEventListener("click", selectObjet);

const start = (event) => {
  const randomIndex = parseInt(Math.random() * 3);
  if (event.target && !enableStart) {
    pcChange.src = dataImagePc[randomIndex];
    if (
      (dataImage[iSelector] === dataImage[0] &&
        dataImagePc[randomIndex] === dataImagePc[2]) ||
      (dataImage[iSelector] === dataImage[1] &&
        dataImagePc[randomIndex] === dataImagePc[0]) ||
      (dataImage[iSelector] === dataImage[2] &&
        dataImagePc[randomIndex] === dataImagePc[1])
    ) {
      if (win < 9) {
        point(++win, winPc);
        textPlayer.textContent = "WINNER";
        textPc.textContent = "LOSER";
        textTie.textContent = "";
      } else {
        whatIsTheWinner(true, false);
      }
    } else if (
      (dataImagePc[randomIndex] === dataImagePc[0] &&
        dataImage[iSelector] === dataImage[2]) ||
      (dataImagePc[randomIndex] === dataImagePc[1] &&
        dataImage[iSelector] === dataImage[0]) ||
      (dataImagePc[randomIndex] === dataImagePc[2] &&
        dataImage[iSelector] === dataImage[1])
    ) {
      if (winPc < 9) {
        point(win, ++winPc);
        textPlayer.textContent = "LOSER";
        textPc.textContent = "WINNER";
        textTie.textContent = "";
      } else {
        whatIsTheWinner(false, true);
      }
    } else {
      textTie.textContent = "TIE";
      textPlayer.textContent = "";
      textPc.textContent = "";
    }
  }
};

playerChange.src = dataImage[3];
pcChange.src = dataImagePc[3];

startGame.addEventListener("click", start);
