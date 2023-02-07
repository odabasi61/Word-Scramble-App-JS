const shuffledWord = document.querySelector(".word");
const hint = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const timeText = document.querySelector(".time span b");
let correctWord;
let timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    Swal.fire({
      title: "Your time ran out!",
      text: `The correct word was ${correctWord.toUpperCase()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Restart",
    }).then((result) => {
      if (result.isConfirmed) {
        initGame();
      } else {
        inputField.disabled = true;
      }
    });
    // initGame();
  }, 1000);
};

const initGame = () => {
  inputField.disabled = false;
  initTimer(15); // calling initTimer func with passing 30 sec as maxTime value
  let randomWord = words[Math.floor(Math.random() * words.length)]; // choose a random word
  // split method splits a string into an array of substrings
  let wordArray = randomWord.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // getting random number
    // shuffling and swiping wordArray letters randomly
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  shuffledWord.innerText = wordArray.join(""); // to remove the commas, we use join method
  hint.innerText = randomWord.hint; // pass the hint of the current word
  correctWord = randomWord.word.toLowerCase(); // pass the randomWord to correctWord
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  // console.log(randomWord.word);
  // console.log(wordArray);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase(); // getting user value
  // if user doesnt enter any value
  if (!userWord)
    return Swal.fire({
      title: "Error!",
      text: "Do not leave the line blank.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  // if user enters wrong value
  if (userWord !== correctWord)
    return Swal.fire({
      title: "Error!",
      text: `${userWord} does not match!`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  // if above two conditions do not happen then it means user entered the correct word
  Swal.fire("Good job!", "You guessed right!", "success");
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
