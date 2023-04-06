import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" 
    >
     <GiftDetective/>
    </div>
  );
}

export default App;



const GiftDetective = () => {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChange1 = (event) => {
    setInputValue1(event.target.value);
  }

  const handleChange2 = (event) => {
    setInputValue2(event.target.value);
  }

  const handleChange3 = (event) => {
    setInputValue3(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue1 !== '' && inputValue2 !== '' && inputValue3 !== '') {
      if (inputValue1 === 'my favorite gift') {
        setCorrectAnswers(correctAnswers + 1);
      }
      if (inputValue2 === 'my favorite color') {
        setCorrectAnswers(correctAnswers + 1);
      }
      if (inputValue3 === 'my favorite food') {
        setCorrectAnswers(correctAnswers + 1);
      }
      setShowAnswer(true);
    } else {
      alert("Please fill all the fields before submitting");
    }
  }

  return (
    <div className="GiftDetective">
      <h1>Can you guess my favorite gift, color and food?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gift:
          <input
            type="text"
            value={inputValue1}
            onChange={handleChange1}
          />
        </label>
        <br />
        <label>
          Color:
          <input
            type="text"
            value={inputValue2}
            onChange={handleChange2}
            />
          </label>
          <br />
          <label>
            Food:
            <input
              type="text"
              value={inputValue3}
              onChange={handleChange3}
            />
          </label>
          <br />
          <button type="submit" disabled={!inputValue1 || !inputValue2 || !inputValue3}>Submit</button>
        </form>
        {showAnswer ? (
          <p>You got {correctAnswers} out of 3 correct.</p>
        ) : (
          <p>Keep guessing.</p>
        )}
      </div>
    );
  };
  
  