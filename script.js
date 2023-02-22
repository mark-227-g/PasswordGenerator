// Assignment code here

// Get references to the button elements
var startBtn = document.querySelector("#startBtn");
var lenBtn = document.querySelector("#lenBtn");
var charBtn = document.querySelector("#charBtn");
var generateBtn = document.querySelector("#generateBtn");

// Get references to the card elements
var lenCardEl = document.querySelector("#lenCard");
var charCardEl = document.querySelector("#charCard");
var genCardEl = document.querySelector("#genCard");

// Get references to data elements
var inputLenEl = document.querySelector("#inputLen");
var msgLenEl = document.querySelector("#msgLen");
var passwordEl = document.querySelector("#password");
var includeUpperEl = document.querySelector("#includeUpper");
var includeLowerEl = document.querySelector("#includeLower");
var includeNumericEl = document.querySelector("#includeNumeric");
var includeSpecialEl = document.querySelector("#includeSpecial");
var msgCharEl = document.querySelector("#msgChar");

/************************************** 
Set element visibile property
**************************************/
function showEl(El, b)
{
  if(b)
    {El.style.visibility="visible";}
  else
    {El.style.visibility="hidden";}
}

/************************************** 
Set element disabled property
**************************************/
function disableEl(El, b)
{
  if(b)
    { El.disabled="disabled";}
  else
    { El.disabled="";}
}

/************************************** 
Start password process
**************************************/ 
function start() 
{
  showEl(lenCardEl,true);
  disableEl(startBtn,true);
}

/************************************** 
Check length, if ok display next card
**************************************/
function checkLen() 
{
  if((inputLenEl.value >= 8) && (inputLenEl.value <=128))
  {
    showEl(charCardEl,true);
    disableEl(lenBtn,true);
    disableEl(inputLenEl,true);
    msgLenEl.textContent="";
  }
  else
  {
    msgLenEl.textContent="Invalid length";
  }
}

/************************************** 
Check if at least one box is checked
if ok then display next card
**************************************/
function checkChar() 
{
  if(includeUpperEl.checked==true ||
    includeLowerEl.checked==true ||
    includeNumericEl.checked==true ||
    includeSpecialEl.checked==true 
    )
    {
      showEl(genCardEl,true);
      disableEl(charBtn,true);
      disableEl(includeUpperEl,true);
      disableEl(includeLowerEl,true);
      disableEl(includeNumericEl,true);
      disableEl(includeSpecialEl,true);
      msgCharEl.textContent="";
    }
  else{
    msgCharEl.textContent="Select at least one";
  }
}

/************************************** 
Return one random symbol
**************************************/
function randomSymbol() 
{
  const passwordSymbols="@%+\/'!#$^?:,(){}[]~-_.";
  i=Math.floor(Math.random() * 22);
  return(passwordSymbols.charAt(i));
}

/************************************** 
Return one random number
**************************************/
function randomNumber()
{
  const numbers ="1234567890"
  i=Math.floor(Math.random() * 9);
  return(numbers.charAt(i));
}

/************************************** 
Return one random upper or lower case letter
**************************************/
function randomLetter(uppercase)
{
  const letters="abcdefghijklmnopqrstuvwxyz"
  i=Math.floor(Math.random() * 25);
  
  if(uppercase)
    {c=letters.toUpperCase()[i];}
  else
    {c=letters[i]};
  return(c);
}

/************************************** 
Generate Password
**************************************/
function generatePassword()
{
  var password=""
  var y=inputLenEl.value;

  //password must include one of each checked type
  if(includeUpperEl.checked)
  {
    password+=randomLetter(true);
    y-=1;  
  };
  
  if(includeLowerEl.checked)
  {
    password+=randomLetter(false);
    y-=1;
  };
  
  if(includeNumericEl.checked)
  {
    password+=randomNumber();
    y-=1;
  };
  
  if(includeSpecialEl.checked)
  {
    password+=randomSymbol();
    y-=1;
  };

  var r=0;
  var i=0;
  while(i<y)
  {
    r=Math.floor(Math.random() * 4);
    switch(r)
    {
      case 0: 
              if(includeUpperEl.checked)
                {password+=randomLetter(true);i+=1};
              break;
      case 1: 
            if(includeLowerEl.checked)
              {password+=randomLetter(false);i+=1};
            break;

      case 2: 
            if(includeNumericEl.checked)
              {password+=randomNumber();i+=1};
            break;
      case 3: 
            if(includeSpecialEl.checked)
              {password+=randomSymbol();i+=1};
            break;
    }
  };

  return(password);
}

/************************************** 
Write password to the #password input
**************************************/
function writePassword() 
{
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

/************************************** 
Copy password to clipboard
**************************************/
function copyToClipboard()
{
  var passwordText = document.querySelector("#password").value;
  navigator.clipboard.writeText(passwordText);
}
/************************************** 
Reset password cards
**************************************/
function reset()
{
  var buttons = document.querySelectorAll("button");
  var i;
  for(i=0; i < buttons.length; i++)
  { disableEl(buttons[i],false);};

  var cards = document.querySelectorAll(".card")
  for(i=0; i < cards.length; i++)
  { showEl(cards[i],false);};

  inputLenEl.value="";
  passwordEl.value = "";

  var checkboxes = document.querySelectorAll("input");
  checkboxes
  for(i=0; i < checkboxes.length; i++)
  { disableEl(checkboxes[i],false);
    checkboxes[i].checked=false;
  };
}

/************************************** 
Add event listener to generate button
**************************************/
resetBtn.addEventListener("click", reset);
startBtn.addEventListener("click", start);
lenBtn.addEventListener("click", checkLen);
charBtn.addEventListener("click", checkChar);
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyToClipboard);