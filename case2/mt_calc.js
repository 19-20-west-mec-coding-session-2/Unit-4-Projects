"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Beckham Le
   Date:   3/12/20
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
//runs the init function when browser first loads in
window.onload = init();

function init(){
   var calcButtons = document.getElementsByClassName("calcButton");

   //loops through all of calcButtons and runs the buttonClick button and displays the value of the object clicked on
   for(var i=0; i<calcButtons.length; i++){
      calcButtons[i].addEventListener("click", buttonClick);
   }
   //displays values of keys on keyboard onto calcwindow
   document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

function buttonClick(e){
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;
   //value of button clicked on
   var buttonValue = e.target.value;

   switch(buttonValue){
      //deletes everything in the box
      case "del":
         calcValue = "";
         break;
      //deletes each number 
      case "bksp":
         calcValue = eraseChar(calcValue);
         break;
      //calculates the result
      case "enter":
         calcValue = calcValue + " = " + evalEq(calcValue, calcDecimal) + "\n";
         break;
      //adds on to calcValue with whatever equation was previous
      case "prev":
         calcValue += lastEq(calcValue);
         break;
      default: 
         calcValue = calcValue + buttonValue;
   }

   document.getElementById("calcWindow").value = calcValue;
   document.getElementById("calcWindow").focus();
}

function calcKeys(e){
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;

   //takes the event o
   switch(e.key){
      //uses the delete button on keyboard to clear out window
      case "Delete":
         calcValue = "";
         break;
      //uses the enter button on keyboard to calculate result
      case "Enter":
         calcValue = calcValue + " = " + evalEq(calcValue, calcDecimal);
         break;
      //uses the arrowup key to do the same thing as the previous button
      case "ArrowUp":
         calcValue = calcValue + lastEq(calcWindow.value);
         break;
   }
   document.getElementById("calcWindow").value = calcValue;
}



/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}