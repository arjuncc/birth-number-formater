/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function BirthNumberFormater(elementId) {
self = this;
self.UI_PATTERN = "______/____";
self.elementId = elementId;
self.Fvalue = "";
/** Initilaize*/
self.init = function() {
	self.setElementValue(self.UI_PATTERN);
        var element = self.getElement();
        element.onkeypress = function(e) {
            console.log("---------------->press<----------------");
                var elementValue = self.getElementValue();
                var singleChar = e.key || String.fromCharCode(e.keyCode);
                var reg = new RegExp('^[0-9]$');
                if(reg.test(singleChar)) {
                  //  var finalElement = self.getNumberOnly(elementValue);//+singleChar;
                    var endValue = self.getNumberEnding(elementValue);
                    //var presentValue = self.getElement();
                   // console.log("presentValue---->"+elementValue.replaceAt(endValue,"")+"  endValue-->"+endValue);
                    console.log("doGetCaretPosition ---------> "+self.doGetCaretPosition());
                    //console.log(self.getNumberEnding(elementValue));
                   // console.log(self.getNumberOnly(self.getElementValue())+singleChar);
                   // self.getNewValue(finalElement,endValue);
                   var finalVl = elementValue.replaceAt(endValue);
                   self.setElementValue(finalVl);
                    self.setCaretPosition(endValue);
                  //  console.log(finalElement);
                    //self.getNewValue(finalElement,endValue);
                    
                } else {
                    console.log("invalid ----> "+singleChar);
                    return false;
                }
        };
         element.onkeydown = function(e) {
            // self.setElementValue(self.Fvalue);
         };
};


self.doGetCaretPosition = function() {
  var oField = self.getElement();
  // Initialize
  var iCaretPos = 0;
  // IE Support
  if (document.selection) {
    // Set focus on the element
    oField.focus();
    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();
    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);
    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }
  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;
  // Return results
  return iCaretPos;
}


/*
self.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};*/

String.prototype.replaceAt=function(index) {
    return this.substr(0, index) + this.substr(index+1,this.length);
};


self.getNumberOnly = function(textFieldVal) {
    var withSlash = textFieldVal.replace(new RegExp("_", 'g'), "");
    return withSlash.replace(/\//g, "");
};

self.getNewValue = function(finalElement,position) {
    position++;
    if(position == 0)
    position++;

    var appender = self.UI_PATTERN.substring(position, self.UI_PATTERN.length); 
    var finalVal = finalElement+appender;
    console.log("appender -------> "+appender);
    console.log("finalElement -------> "+finalElement);
    console.log("position -------> "+(position));
    self.Fvalue = finalVal;
   // console.log("appender -------> "+finalElement+appender);
    //console.log("document.getElementById(txt_birthNo).value"+document.getElementById("txt_birthNo").value);
    self.setElementValue(finalElement+appender);
    console.log("position -------> "+finalVal);
   //document.getElementById("txt_birthNo").value = "";
   //document.getElementById("txt_birthNo2").value = finalVal;
};

self.getNumberEnding = function(textFieldVal) {
    var indexUnderscore = textFieldVal.indexOf("_"); 
   // var indexSlash = textFieldVal.indexOf("/");
   // var intex = indexUnderscore < indexSlash ? indexUnderscore : indexSlash;
    return indexUnderscore;
};
/*
self.onlyNumber = function(e) {
        if(window.event) { // IE                    
          keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
          keynum = e.which;
        }
        var charValue = String.fromCharCode(keynum);
        var valid = /^[0-9]+$/.test(charValue);
        if (!valid) {
            e.preventDefault();
        }
};*/

/** To get the element*/
self.getElement = function() {  
 return document.getElementById(self.elementId);
};

/**To Set the value*/
self.setElementValue = function(elementValue) {
	self.getElement().value = elementValue;
};

/**To Get the value*/
self.getElementValue = function() {
	return self.getElement().value;
};

/** To set the position*/
self.setCaretPosition = function(caretPos) {
    var elem = self.getElement();
    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
};
self.init();
}
