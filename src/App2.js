//todo: input picture, 

import React, { useState, useRef, useEffect} from 'react';
import LoadingPage from './LoadingPage';
import './App2.css';
import UploadPicHandler from './UploadPicHandler';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ClipLoader, BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader } from "react-spinners";
const allAnswers = [];
function App2() {
  const [data, setData] = useState([]);

  // const handleChildData = (childData) => {
  //   setData(childData);
  //   console.log(childData);
  // };

  return (
    <Router>

    <div className="App" 
    >

      <Routes>
        <Route 
          path='/' 
          element={
           <GiftDetective 
             nextPage='/question2' 
             stayOnthisPage='/' 
             question="Can you guess my favorite food?" 
             />
             } />
        <Route 
          path='/question2' 
          element={
            <GiftDetective 
              nextPage='/question3' 
              stayOnthisPage ='/question2' 
              question="Can you guess my favorite color?"  
            />
          } 
          />
        <Route 
          path='/question3' 
          element={
            <GiftDetective 
              nextPage='/result' 
              stayOnthisPage='/question3' 
              question="Can you guess my favorite gift?"  
            />
          } 
        />
        <Route  
        path='/result' 
        element={ 
          <Resultpage 
            data = {allAnswers}
            /> 
          } 
        />
      </Routes>
      {/* <UploadPicHandler/> */}
    </div>
    </Router>

  );
}

const GiftDetective = (props) => {
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [submitOnce, setSubmitOnce] = useState(false);
    const [image, setImage] = useState('');
    const linkRef = useRef(null);
    // const [showResult, setShowResult] = useState(false);
    
    useEffect(()=>{
      const ACCESS_KEY = 'XTHkUujQlEEg5KTxxPl_cjBsObWWBpPzusd0vPoKVc8';
      const keyword = 'green';

    // make a request to the Unsplash API
    fetch(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${ACCESS_KEY}`)
      .then(response => response.json())
      .then(data => {
        // get the URL of the first image in the results
        const imageUrl = data.results[0].urls.regular;
        setImage(imageUrl);
      })
      .catch(error => console.error(error));

      setSelectedBoxes([]);
      setCorrectAnswers(0);
      setShowAnswer(false);
      setShowLoading(false);
      setSubmitOnce(false);
      setImage('');
      console.log(props.nextPage)
    },[props.nextPage])
  
    const handleBoxClick = (index) => {
      if(submitOnce){

        return;
      }
      // toggle the selected state of the box
      if (selectedBoxes.includes(index)) {
        setSelectedBoxes(selectedBoxes.filter((i) => i !== index));
      } else if (selectedBoxes.length < 3) {
        setSelectedBoxes([...selectedBoxes, index]);
      } else {
        alert("You can only select 3 images!");
      }
    }
  
    const handleSubmit = () => {
      if (selectedBoxes.length < 3) {
        alert("You need to select 3 images before submitting!");
        return;
        
      }
      let correctIncrement = 0;
      setSubmitOnce(true);
      let num = 7; 
      const tempArr = []; //gather all the already random number
        const answers = Array.from({length: 3}, (_, i) => i + 1).map(function(){ 
          while(num > 6 || tempArr.includes(num) ){ 
            num = Math.floor(Math.random() * 10)+1
          }
          tempArr.push(num)
          return num;
        } );
        console.log(answers);
      

      // check if the selected boxes match the correct answers
      const CASeletedPosition = [];
      answers.forEach((answer) => {
        if (selectedBoxes.includes(answer)) {
          correctIncrement++;
          CASeletedPosition.push(answer);
        }
      });

      setCorrectAnswers(correctAnswers + correctIncrement);

      console.log(correctIncrement+" is correct answers");
      
      //need to check this out
      // props.onChildData(correctIncrement);
      /*
      props.onChildData({
        correctAnswers: correctIncrement,
        correctIndexes:answers,
        guesses: selectedBoxes});
      */
        setShowAnswer(true);
        // props.goToNextComponent();
        // linkRef.current.click();


        allAnswers.push({
          correctAnswer: correctIncrement,
          CASeletedPosition: CASeletedPosition,
          CAPositions: answers,

        })




    }
  
    const handleReset = ()=>{
      setShowLoading(true);
    }
    const renderBox = (index) => {

      const imageUrl = `https://source.unsplash.com/random/200x200?sig=${index}`;
      const isSelected = selectedBoxes.includes(index);
      return (
        <div key ={index}
          className={`box ${isSelected ? 'selected' : ''}`}
          onClick={() => handleBoxClick(index)}
        >
          <img src={/*imageUrl*/ image} alt="" />
        </div>
      );
    }
  
    return (
      <div className="GiftDetective">
        <h1>{props.question}</h1>
        <div className="boxes">
          {Array.from({ length: 6 }, (_, i) => i + 1).map(renderBox)}
        </div>
        {/* <button onClick={handleReset}>Reset</button> */}
        
        <div>
          {showLoading ? <div> <LoadingPage/></div>: null}
        </div>

        {/* <button onClick={!submitOnce && selectedBoxes.length >2 ? handleSubmit : null }>answers</button> */}
          {/* <Link className='links'onClick={!submitOnce && selectedBoxes.length >=0 ? handleSubmit : null } to='/result'>Result</Link> */}
        
        
        {/* {showAnswer ? (
          <Link ref={linkRef} to='/result'>result</Link>
        ) : (
          <p>Keep guessing.</p>
        )} */}

      <Link ref={linkRef} 
      onClick={
        !submitOnce && selectedBoxes.length >2 ? 
        handleSubmit : null
      } 
        to={
          !submitOnce && selectedBoxes.length >2 ? 
          props.nextPage: props.stayOnthisPage
          }> 
          <button>Next</button>
          </Link>
        {/* {correctAnswers} */}
      </div>
      
    );
  };


  function Resultpage(props) {
    const messages = ['color(s)','food(s)', 'gift(s)']
    // console.log(props.data);
    return (
      <div>
        
        {
          props.data.map((item, i) => (
              <div className='result-container' key={i}>
                <p>You correctly guessed {item.correctAnswer} {messages[i]}</p>
                <div className='boxes'>
                {
                    item.CASeletedPosition.map((box, j) => (
                      <div key={j}>
                        <EachResult id={box} />
                      
                      </div>
                    )
                  )
                }
                </div>
              </div>
            )
          )
        }
      </div>
    );
  }
  

  function EachResult(props){
    const renderBox = (index) => {

      // const imageUrl = `https://source.unsplash.com/random/200x200?sig=${props.id}`;
      const imageUrl = `https://source.unsplash.com/random/200x200?sig=${props.id}`;
      return (
        <div 
          className='box box-result'
        >
          <img src={imageUrl} alt="" />
        </div>
      );
    }
    return(
      <div>
        {renderBox()}
      </div>
    )
  }

export default App2;
