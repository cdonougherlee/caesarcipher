//Put DOM elements into variables
const wordsInput = document.querySelector('#user-input');
const shiftInput = document.querySelector('select');
const functionRadios = document.querySelectorAll('.function-buttons');
const directionRadios = document.querySelectorAll('.direction-buttons');
const result1 = document.querySelector("#result-1");
const result2 = document.querySelector("#result-2");
const result1Label = document.querySelector("#result-1-label");
const result2Label = document.querySelector("#result-2-label");

//Default values
let encrypt = true;
let right = true;

//Listen for change in text entered, shift amount
wordsInput.addEventListener('keyup', onSubmit);
shiftInput.addEventListener('change', onSubmit);

//Listen for change in function radio buttons
for (const radio of functionRadios) {
  radio.onclick = function(e) {
    //If encrypt, enable direction options
    if (e.target.value === "encrypt") {
      encrypt = true;
      for (const rad of directionRadios){
        rad.disabled = false;
      }

      //Changing display for encrypt
      result2.classList.remove('bg-white');
      result1Label.innerHTML = "Encrypted text";
      result2Label.innerHTML = "";
      result2.classList.add('bg-secondary');

    } else{
      //If decrypt, disable direction options (as both directions will be displayed)
      encrypt= false;
      for (const rad of directionRadios){
        rad.disabled = true;
      }

      //Changing display for decrypt
      result1Label.innerHTML = "Right shift result";
      result2Label.innerHTML = "Left shift result";
      result2.classList.add('bg-white');
    }
    onSubmit();
  }
}

//Listen for change in direction buttons
for (const radio of directionRadios) {
  radio.onclick = function(e) {
    if (e.target.value === "rightShift") {
      right = true;
    } else{
      right = false;
    }
    onSubmit();
  }
}

//Collect all input to be processed
function collectData(){
  const textToShift = wordsInput.value;
  const shift = Number(shiftInput.value);
  return [textToShift, encrypt, shift];
}


//Handle submittion
function onSubmit() {
  [textToShift, encrypt, shift] = collectData();

  //Process data
  let rightShiftResult;
  let leftShiftResult;

  if (encrypt === true){
    result2.value = ""; //Only one result to display

    if (right === true){
      rightShiftResult = shiftRight(textToShift, shift);
      result1.value = rightShiftResult;
    } else {
      //Direction is left shift
      leftShiftResult = shiftLeft(textToShift, shift);
      result1.value = leftShiftResult;
    }
  } else {
    //Decrypt (displays both positive and negative shift)
    rightShiftResult = shiftRight(textToShift, shift);
    leftShiftResult = shiftLeft(textToShift, shift);
    result1.value = rightShiftResult;
    result2.value = leftShiftResult;
  }  
}

function shiftRight(textToShift, shift) {
  let answer = "";

  for (i=0; i< textToShift.length; i++) {
    let letter = textToShift[i];
    let letterKeyCode = letter.charCodeAt();
    let newKeyCode = letterKeyCode + shift;

    //Upper case letter
    if ((letterKeyCode >= 65) && (letterKeyCode <= 90)) {
      //Under max limit
      if ((newKeyCode) <= 90) {
        answer += String.fromCharCode(newKeyCode);
      }
      //Over max limit
      else {
        answer += String.fromCharCode(65 + ((newKeyCode) % 90) - 1);
      }
    }

    //Lower case letter
    else if ((letterKeyCode >= 97) && (letterKeyCode <=122)) {
      //Under max limit
      if ((newKeyCode) <=122) {
        answer += String.fromCharCode(newKeyCode);
      }
      //Over max limit
      else {
        answer += String.fromCharCode(97 + ((newKeyCode) % 122) - 1);
      }
    }

    // Not a letter
    else {
      answer += letter;
    }
  }
  return answer;
}

function shiftLeft(textToShift, shift) {
   let answer = "";

  for (i=0; i< textToShift.length; i++) {
    let letter = textToShift[i];
    let letterKeyCode = letter.charCodeAt();
    let newKeyCode = letterKeyCode - shift;

    //Upper case letter
    if ((letterKeyCode >= 65) && (letterKeyCode <= 90)) {
      //Over min limit
      if ((newKeyCode) >= 65) {
        answer += String.fromCharCode(newKeyCode);
      }
      //Under min limit
      else { 
        answer += String.fromCharCode(90 - (65 % (newKeyCode)) + 1);
      }
    }

    //Lower case letter
    else if ((letterKeyCode >= 97) && (letterKeyCode <=122)) {
      //Over min limit
      if ((newKeyCode) >= 97) {
        answer += String.fromCharCode(newKeyCode);
      }
      //Under min limit
      else {
        answer += String.fromCharCode(122 - (97 % (newKeyCode)) + 1);
      }
    }

    // Not a letter
    else {
      answer += letter;
    }
  }
  return answer;
}