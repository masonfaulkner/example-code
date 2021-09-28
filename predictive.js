
defaultString =
  "The third thing that I need to tell you is that this thing does not think thoroughly.";

document.getElementById("trainText").defaultValue = defaultString;

// make capitalization uniform and remove punctuation
let lowerArr = defaultString
  .toLowerCase()
  .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

// initial conversion to list
let trainingArr = lowerArr.split(" ");
let occurences = getConfidence(trainingArr);


function getWord() {
  let inputText = document.getElementById("inputText");
  let inputArr = inputText.value.split(" ");
  console.log("inputArr: " + inputArr);

  let latestInput = inputArr[inputArr.length - 1];
  console.log("Last: " + latestInput);
  getWords(occurences, latestInput);
  console.log("confidence: " + getConfidence(trainingArr));
}

function train() {
  let trainText = document.getElementById("trainText");
  let trainArr = trainText.value.toLowerCase()
  .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  trainArr = trainArr.split(" ");
  console.log("trainingArr: " + trainArr);
  occurences = getConfidence(trainArr);
}

function updateWord(word) {
  document.getElementById("inputText") = word;
}

function getWords(dict, latest) {
  removeOldButtons();
  for (item in dict) {
    if (item.startsWith(latest) && latest.length >= 1) {
      var x = document.createElement("button");
      x.type = "button";
      x.className = "btn btn-primary";
      x.textContent = "(" + dict[item] + "): " + item;
      x.id = "groupButton";
      x.style = "margin-right:3px";
  
      var newButton = document.getElementById("insertButton");
      newButton.appendChild(x);
    }
  }
}

// clear out old buttons
function removeOldButtons() {
  while (document.getElementById("groupButton")) {
    var x = document.getElementById("groupButton");
    x.parentNode.removeChild(x);
  }
}

// Check occurences of each word
function getConfidence(arr) {
  dict = {};
  for (i = 0; i < arr.length; i++) {
    if (dict[arr[i]]) {
      dict[arr[i]] += 1;
    } else {
      dict[arr[i]] = 1;
    }
  }
  return dict;
}
