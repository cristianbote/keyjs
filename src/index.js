/**
 * Holds the current pressed keys
 * @type {Array}
 */
const pressedKeys = [];

/**
 * Holds the saved combos with their handlers and/or node elements
 * @type {Map}
 */
const savedCombos = new Map();


/**
 * Checks the current combo from pressed keys
 * and fires up the handlers per combo saved.
 * @param {HTMLElement} target 
 */
function checkCombination(target) {
  const currentCombo = pressedKeys.join("+");

  if (savedCombos.has(currentCombo)) {
    const { handler, node } = savedCombos.get(currentCombo);
    if (node && node === target) {
      handler(node);
    } else if (!node) {
      handler();
    }
  }
}

/**
 * Listens to the key up event and calls `checkCombination`
 * for matching combos
 * @param {KeyboardEvent} e 
 */
function keyUpListener(e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  const index = pressedKeys.indexOf(e.key);

  if (index !== -1) {
    pressedKeys.splice(index, 1);
    checkCombination(e.target);
  }
}

/**
 * Listens to the key down event and calls `checkCombination`
 * for matching combos
 * @param {KeyboardEvent} e 
 */
function keyDownListener(e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  const index = pressedKeys.indexOf(e.key);

  if (index === -1) {
    pressedKeys.push(e.key);
    checkCombination(e.target);
  }
}

// Binding to the keyboard events should be done
// only on clientside.
if (typeof window !== "undefined") {
  window.addEventListener("keyup", keyUpListener, false);
  window.addEventListener("keydown", keyDownListener, false);
}

/**
 * Hook for registering keyboard combo with a handler
 * @param {String} combo 
 * @param {Function} handler 
 */
export const onCombo = (combo, handler) => {
  if (!savedCombos.has(combo)) {
    savedCombos.set(combo, { handler });
  }
};

/**
 * Hook for registering keyboard combo for a specific dom node
 * with a handler
 * @param {String} combo 
 * @param {HTMLElement} node 
 * @param {Function} handler 
 */
export const onComboNode = (combo, node, handler) => {
  if (!savedCombos.has(combo)) {
    if (!node.hasAttribute("tabindex")) {
      console.warn(
        "Keyjs: You are trying to listen to a node without the tabindex. That will make it harder to focus and being able to detect the combinations."
      );
    }
    savedCombos.set(combo, { node, handler });
  }
};
