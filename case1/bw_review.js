"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 1

   Author: Beckham Le
   Date:   3/11/20
   
   Filename: bw_review.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers.
      
   lightStars(e)
      Function that colors the stars representing the user rating
      for the book.
      
   turnOffStars(e)
      Function that restores the stars to empty colors, removing
      the user rating for the book.

   updateCount()
      Updates the count of characters in the wordCountBox
      element.

   countCharacters(textStr)
      Returns the number of a non-whitespace characters
      within textStr

*/
//runs the init function when the browser first loads in
window.onload = init();

function init(){
   var stars = document.querySelectorAll("span#stars img");

   //loops through the collection of stars that will change the cursor to pointer and activates the lightStars function when clicked
   for(var i=0; i<stars.length; i++){
      stars[i].style.cursor = "pointer";
      stars[i].addEventListener("mouseenter", lightStars)
   }

   document.getElementById("comment").addEventListener("keyup", updateCount)
}
  
function lightStars(e){
   var starNumber = e.target.alt;
   var stars = document.querySelectorAll("span#stars img");

   for(var i=0; i<starNumber; i++){
      stars[i].src = "bw_star2.png";
   }

   for(var j=starNumber; j<5; j++){
      stars[i].src = "bw_star.png";
   }
   document.getElementById("rating").value = (starNumber + " stars");

   //adds event listener that will run the turnOffStars function when the mouse leaves the stars
   e.target.addEventListener("mouseleave", turnOffStars);
   //adds event listener that will turn off the previous event listener when the mouse clicks onto a specific star
   e.target.addEventListener("click", 
      function(){
         e.target.removeEventListener("mouseleave", turnOffStars);
      })
}

function turnOffStars(){
   var stars = document.querySelectorAll("span#stars img");

   for(var i=0; i<stars.length; i++){
      stars[i].src = "bw_star.png";
   }
   document.getElementById("rating").value = "";
}

function updateCount(){
   var commentText = document.getElementById("comment").value;
   //the amount of characters in the comment text area
   var charCount = countCharacters(commentText);
   //the input box of wordCount
   var wordCountBox = document.getElementById("wordCount");

   wordCountBox.value = charCount + "/1000";

   //if the number of characters exceeds 1000 it will change font color to white and bg color to red
   if(charCount > 1000){
      wordCountBox.style.color = "white";
      wordCountBox.style.backgroundColor = "red";
   }
   //default font color black and bg color to white
   else{
      wordCountBox.style.color = "black";
      wordCountBox.style.backgroundColor = "white";
   }
}
  
  
  
/*=================================================================*/

function countCharacters(textStr) {
   var commentregx = /\s/g;
   var chars = textStr.replace(commentregx, "");
   return chars.length;
}   