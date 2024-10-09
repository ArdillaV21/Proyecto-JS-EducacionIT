"use strict";

var root = document.getElementById("root");
var calc = {};
var obj = {
  symbols: ["+", "-", "*", "/"],
  actions: ["CE", "C", "="],
  fn: ["clearElement", "clear", "calcResult"],
  numbers: numbers()
}; // Generador de Arrays

function numbers() {
  var ini = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var fin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var arr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  for (var i = ini; i <= fin; i += step) {
    arr.push(i);
  }

  return arr;
} // Renderizado de ELementos


var renderElement = function renderElement(_ref) {
  var element = _ref.element,
      props = _ref.props,
      parent = _ref.parent;
  return parent.appendChild(Object.assign(document.createElement(element), props));
}; // Renderizado de botones


var render = function render(arr, className) {
  var container = document.createElement("div");
  container.setAttribute("id", className);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      container.innerHTML += "<button>".concat(item, "</button>");
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  root.appendChild(container);
}; // Funciones de la Calculadora


var clear = function clear() {
  return Object.assign(calc, {
    n1: "",
    op: "",
    n2: ""
  }) && 0;
};

var clearElement = function clearElement() {
  return (calc.op ? calc.n2 = "" : calc.n1 = "") && 0;
};

var setOperation = function setOperation(symbol) {
  return (calc.op = symbol) && calc.n1;
};

var calcResult = function calcResult() {
  return calc.n1 = calc.op && calc.n2 && eval(calc.n1 + calc.op + calc.n2);
};

var addDigit = function addDigit(n) {
  return calc.op ? calc.n2 += n : calc.n1 += n;
};

var setDigit = function setDigit(n) {
  return calc.op ? calc.n2 = n : calc.n1 = n;
}; // Asignacion de Funciones


var setValue = function setValue(value) {
  for (var i = 0; i < obj.actions.length; i++) {
    if (obj.actions[i] == value) return eval(obj.fn[i] + "()");
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = obj.symbols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var s = _step2.value;
      if (s == value) return setOperation(value);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return addDigit(value);
}; // Asignacion de Acciones


var setActions = function setActions() {
  var buttons = document.querySelectorAll("button");
  var input = document.querySelector("input");
  input.addEventListener("input", function (_ref2) {
    var value = _ref2.target.value;
    return setDigit(value);
  });
  buttons.forEach(function (btn) {
    return btn.addEventListener("click", function (_ref3) {
      var innerText = _ref3.target.innerText;
      input.value = setValue(innerText);
      input.focus();
    });
  });
}; // Vistas de Calculadora


clear();
renderElement({
  element: "input",
  props: {
    id: "input",
    type: "number"
  },
  parent: root
});
Object.keys(obj).forEach(function (k) {
  return k != 'fn' && render(obj[k], k);
});
setActions();