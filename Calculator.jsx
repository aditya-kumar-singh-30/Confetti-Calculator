import React, { useState } from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [memory, setMemory] = useState(null);
  const [isRadian, setIsRadian] = useState(true);
  const [explode, setExplode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const sciKeys = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×',
    '¹/ₓ', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '−',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  const operatorIndex = [9, 19, 29, 39, 48];
  const wideIndex = [46];
  const lowerIndex = [40];
  const lowerRight = [48];
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const buttonClickHandler = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        const result = evaluateExpression(input);
        setInput(result);
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'mc') {
      setMemory(null);
    } else if (value === 'm+') {
      setMemory(prev => (prev ? prev + parseFloat(input) : parseFloat(input)));
    } else if (value === 'm-') {
      setMemory(prev => (prev ? prev - parseFloat(input) : -parseFloat(input)));
    } else if (value === 'mr') {
      if (memory !== null) {
        setInput(memory.toString());
      }
    } else if (value === '+/-') {
      setInput(prev => (prev.charAt(0) === '-' ? prev.substring(1) : '-' + prev));
    } else if (value === '%') {
      setInput(prev => (parseFloat(prev) / 100).toString());
    } else if (value === '2nd') {
      // Toggle between basic and advanced functions
      // This can be expanded as per requirements
    } else if (value === 'x²') {
      setInput(prev => (Math.pow(parseFloat(prev), 2)).toString());
    } else if (value === 'x³') {
      setInput(prev => (Math.pow(parseFloat(prev), 3)).toString());
    } else if (value === 'xʸ') {
      setInput(prev => (prev + '**'));
    } else if (value === 'eˣ') {
      setInput(prev => (Math.exp(parseFloat(prev))).toString());
    } else if (value === '10ˣ') {
      setInput(prev => (Math.pow(10, parseFloat(prev))).toString());
    } else if (value === '¹/ₓ') {
      setInput(prev => (1 / parseFloat(prev)).toString());
    } else if (value === '²√x') {
      setInput(prev => (Math.sqrt(parseFloat(prev))).toString());
    } else if (value === '³√x') {
      setInput(prev => (Math.cbrt(parseFloat(prev))).toString());
    } else if (value === 'ʸ√x') {
      setInput(prev => (prev + '^(1/'));
    } else if (value === 'ln') {
      setInput(prev => (Math.log(parseFloat(prev))).toString());
    } else if (value === 'log₁₀') {
      setInput(prev => (Math.log10(parseFloat(prev))).toString());
    } else if (value === 'sin') {
      handleTrigonometricFunction(value);
    } else if (value === 'cos') {
      handleTrigonometricFunction(value);
    } else if (value === 'tan') {
      handleTrigonometricFunction(value);
    } else if (value === 'e') {
      setInput(prev => prev + Math.E.toString());
    } else if (value === 'EE') {
      setInput(prev => (prev + 'e'));
    } else if (value === 'Rad') {
      setIsRadian(prev => !prev);
    } else if (value === 'sinh') {
      setInput(prev => (Math.sinh(parseFloat(prev))).toString());
    } else if (value === 'cosh') {
      setInput(prev => (Math.cosh(parseFloat(prev))).toString());
    } else if (value === 'tanh') {
      setInput(prev => (Math.tanh(parseFloat(prev))).toString());
    } else if (value === 'π') {
      setInput(prev => (prev + Math.PI.toString()));
    } else if (value === 'Rand') {
      setInput(prev => (Math.random().toString()));
    } else if (value === 'x!') {
      setInput(prev => (factorial(parseInt(prev))).toString());
    } else {
      setInput(prev => prev + value);
    }
  };

  const evaluateExpression = (expression) => {
    const sanitizedExpression = expression
      .replace('÷', '/')
      .replace('×', '*')
      .replace('−', '-')
      .replace('^', '**')
      .replace('√', 'Math.sqrt');
  
      if (sanitizedExpression.includes('5') && sanitizedExpression.includes('6')) {
        triggerConfetti();
      }
    return eval(sanitizedExpression).toString();
   
      
     
  };

  const handleTrigonometricFunction = (func) => {
    if (input === '') {
      setInput('NaN');
    } else {
      const value = parseFloat(input);
      let result;
      switch (func) {
        case 'sin':
          result = isRadian ? Math.sin(value) : Math.sin(degToRad(value));
          break;
        case 'cos':
          result = isRadian ? Math.cos(value) : Math.cos(degToRad(value));
          break;
        case 'tan':
          result = isRadian ? Math.tan(value) : Math.tan(degToRad(value));
          break;
        default:
          result = 'Error';
      }
      setInput(result.toString());
    }
  };

  const factorial = (n) => {
    if (n < 0) return 'Error';
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const triggerConfetti = () => {
    setExplode(true);
    setTimeout(() => setExplode(false), 3000); 
  };
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle dark mode
  };
  return (
    <div style={{ backgroundColor: darkMode ? "black" : "white", height: "100vh" }}>
      <div className="calculator">
      {explode && (
        <ConfettiExplosion
          duration={3000} // duration of the explosion in milliseconds
          particleCount={100} // number of confetti particles
          force={0.5} // force of the explosion
          colors={['#FF69B4', '#33CC33', '#6666CC']} // colors of the confetti particles
        />
      )}
        <input style={{ backgroundColor: darkMode ? "white" : "black", color:darkMode?"black":"white" }}
          className="main-input"
          required
          value={input}
          onChange={inputHandler}
        />
        <div className="button-box">
          {sciKeys.map((item, index) => (
            <button
              className={`button ${
                operatorIndex.includes(index) ? "operator" : ""
              } ${wideIndex.includes(index) ? "wide" : ""} 
                ${lowerIndex.includes(index) ? "bottom" : ""} 
                ${lowerRight.includes(index) ? "bottom-right" : ""} `}
              key={index}
              onClick={() => buttonClickHandler(item)}
            >
              {item}
            </button>
           
          ))}
        </div>
        <div className="container">
         <button style={{ backgroundColor: darkMode ? "white" : "black", color:darkMode?"black":"white" }} className="Mode-button" onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button></div>
      </div>
    </div>
  );
};
export default Calculator;
