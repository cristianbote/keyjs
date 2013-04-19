/*
   Key.js
   @author: Cristian Bote
   (c) 2013 Copyright
*/

(function (window) {

   /* Constructor/Definition */
   //var Key =  { };
   function Key() {};

   /* Public methods */

   /* Return Boolean if that key is pressed */
   Key.on = function (id, callback) {
      if(callback) {
        
        if(id.length === 1) {
            if(!_combo[id]) {
                _combo[id] = callback;
            }
        } else {
            combination(id, callback);
        }


      } else {
        return _map.indexOf(_id[id]) !== -1 ? true : false; id = null;
      }
   }

   /* Registers a combination and a handler for it to dispatch */
   function combination(combo, callback) {
      combo = String(combo).toUpperCase();
      console.log(combo.split("+").length, combo.length);
      if(combo.split("+").length + 2 != combo.length) combo = combo.split("+").join("").split("").join("+");

      if(!callback || typeof callback !== "function") { console.warn("Key.js: Key.combo[ There's no callback. You need to pass a callback ]"); return; }
      
      if(!_combo[combo] && callback) {
         _combo[combo] = callback;
         _comboList.push(combo.split("+"));
      }
      combo, callback = null;
      delete combo, callback;
   }

   /* */

   /* Private mapping variable to store the e.keyCode and test against the _id */
   var _map = [];
   var _combo = {};
   var _comboList = [];

   /* Stores the key pressed */
   var current = [];

   /* Register a key code */
   function registerKey(e) {
      if (_map.indexOf(e.keyCode) === -1) {
         _map.push(e.keyCode);
         if(!checkCombo(getCharFromCode(e.keyCode), e) && _combo[getCharFromCode(e.keyCode)]) _combo[getCharFromCode(e.keyCode)]();
      }
      arguments = null;
   }

   /* Removes a key code */
   function cleanKey(e) {
      if (_map.indexOf(e.keyCode) !== -1) {
         var a = _map.splice(_map.indexOf(e.keyCode), 1);
         delete a;
      }

      arguments = null;
      delete arguments;
   }

   /* Check if there's a combination formed, and dispatches the handler */
   function checkCombo(key, e) {
      var i, t, composed, tocheck;
      key = String(key).toUpperCase();
      current.push(key);

      composed = current.join("+");

      for(i = 0; i < _comboList.length; i++) {
         tocheck = _comboList[i].join("+");
         if(composed.length >= tocheck.length) {
            t = composed.substr(composed.length - tocheck.length, composed.length);
            if(t === tocheck) {
               e.combo = t;
               _combo[t](e);
               return true;
            }
         }
      }

      i, key, e, composed, tocheck, t = null;
      return false;
   }

   /* Returns the character form a charCode */
   function getCharFromCode(code) {
      var i = "";
      for( var a in _id) {
         if(code === _id[a]) {
            i = a;
            break;
         }
      }

      a, code = null;
      delete a, code;

      return i;
   }


   /* Initialize the Key.js */
   var init = function () {
      window.addEventListener("keydown", registerKey);
      window.addEventListener("keyup", cleanKey);
   } ();


   /* Cross browser event listeners */
   function addEventListener(event, callback, target) {
      var _target = target ? target : window;

      if (_target.attachEvent) {
         _target.attachEvent("on" + event, function () { callback.call(_target) });
      } else {
         _target.addEventListener(event, callback, false);
      }

      _target, event, callback, target = null;

      delete _target;
      delete event;
      delete callback;
      delete target;
   }

   var _id = {
      'A' : 65,
		'a' : 65, 
		'B' : 66,
		'b' : 66,
		'C' : 67,
		'c' : 67,
		'D' : 68,
		'd' : 68,
		'E' : 69,
		'e' : 69,
		'F' : 70,
		'f' : 70,
		'G' : 71,
		'g' : 71,
		'H' : 72,
		'h' : 72,
		'I' : 73,
		'i' : 73,
		'J' : 74,
		'j' : 74,
		'K' : 75,
		'k' : 75,
		'L' : 76,
		'l' : 76,
		'M' : 77,
		'm' : 77,
		'N' : 78,
		'n' : 78,
		'O' : 79,
		'o' : 79,
		'P' : 80,
		'p' : 80,
		'Q' : 81,
		'q' : 81,
		'R' : 82,
		'r' : 82,
		'S' : 83,
		's' : 83,
		'T' : 84,
		't' : 84,
		'U' : 85,
		'u' : 85,
		'V' : 86,
		'v' : 86,
		'W' : 87,
		'w' : 87,
		'X' : 88,
		'x' : 88,
		'Y' : 89,
		'y' : 89,
		'Z' : 90,
		'z' : 90,
		
		/// Numbers
		'N0' : 48,
		0 : 48,
		'N1' : 49,
		1 : 49,
		'N2' : 50,
		2 : 50,
		'N3' : 51,
		3 : 51,
		'N4' : 52,
		4 : 52,
		'N5' : 53,
		5 : 53,
		'N6' : 54,
		6 : 54,
		'N7' : 55,
		7 : 55,
		'N8' : 56,
		8 : 56,
		'N9' : 57,
		9 : 57,
		
		/// Number Pad
		'NP0' : 96,
		'NP1' : 97,
		'NP2' : 98,
		'NP3' : 99,
		'NP4' : 100,
		'NP5' : 101,
		'NP6' : 102,
		'NP7' : 103,
		'NP8' : 104,
		'NP9' : 105,
		'NP*' : 106,
		'NP+' : 107,
		'NPENTER' : 13,
		'NP-' : 109,
		'NP.' : 110,
		'NP/' : 111,
		
		/// Function Keys
		'F1' : 112,
		'F2' : 113,
		'F3' : 114,
		'F4' : 115,
		'F5' : 116,
		'F6' : 117,
		'F7' : 118,
		'F8' : 119,
		'F9' : 120,
		'F11' : 122,
		'F12' : 123,
		'F13' : 124,
		'F14' : 125,
		'F15' : 126,
		
		/// Other
		'BACKSPACE' : 8,
		'TAB' : 9,
		'ENTER' : 13,
		'SHIFT' : 16,
		'CTRL' : 17,
		'CAPS' : 20,
		'ESC' : 27,
		'SPACE' : 32, 
		' ' : 32,
		'PGUP' : 33,
		'PGDN' : 34,
		'END' : 35,
		'HOME' : 36,
		'LEFT' : 37,
		'UP' : 38,
		'RIGHT' : 39,
		'DOWN' : 40,
		'INS' : 45,
		'DEL' : 46,
		'NUMLCK' : 144,
		'SCRLCK' : 145,
		'PAUSE' : 19,
		'SCOLON' : 186,
		',' : 186,
		':' : 186,
		'EQUAL' : 187,
		'=' : 187,
		'+' : 187,
		'MINUS' : 189,
		'-' : 189,
		'_' : 189,
		'FSLASH' : 191,
		'/' : 191,
		'?' : 191,
		'ACCENT' : 192,
		'`' : 192,
		'~' : 192,
		'LBRACKET' : 219,
		'[' : 219,
		'{' : 219,
		'BSLASH' : 220,
		'\\' : 220,
		'|' : 220,
		'RBRACKET' : 221,
		']' : 221,
		'}' : 221,
		'QUOTE' : 222,
		"'" : 222,
		'"' : 222,
		'COMMA' : 188,
		',' : 188,
		'<' : 188,
		'PERIOD' : 190,
		'.' : 190,
		'>' : 190,
		'FSLASH2' : 191,
   };

   /* If There's already a window.Key move to K */
   if(window.Key) { window.K = Key; console.warn("Key.js: There's another Class named Key, switching to K");
   } else { window.Key = Key; }
} (window));