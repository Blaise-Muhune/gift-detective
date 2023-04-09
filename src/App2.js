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

  const componentProps = [
    {
      question:'Can you guess my favorite color?',
  },
    {
      question:'Can you guess my favorite Food?',
  },
    {
      question:'Can you guess my favorite gift?',
    nextPage: '/result'
  }
  ]

  const handleChildData = (childData) => {
    setData(childData);
    console.log(childData);
  };

  return (
    <Router>

    <div className="App" 
    >

      <Routes>
        {/* <Route path='/' element={<AllThreeComponents items ={componentProps} onChildData={handleChildData}/>} /> */}
        <Route path='/' element={<GiftDetective nextPage='/question2' question="Can you guess my favorite food?" onChildData ={handleChildData}/>} />
        <Route path='/question2' element={<GiftDetective nextPage='/question3' question="Can you guess my favorite color?" onChildData ={handleChildData} />} />
        <Route path='/question3' element={<GiftDetective nextPage='/result' question="Can you guess my favorite gift?" onChildData={handleChildData} />} />
        <Route  path='/result' element={ <Resultpage data = {allAnswers}/> } />
      </Routes>
      {/* <UploadPicHandler/> */}
    </div>
    </Router>

  );
}

function OneDetective ({item}){
return(
  <div>
          <h2>{item.question}</h2>
          <p>{item.question}</p>
  </div>
)
}

function AllThreeComponents({items}){
  const [data, setData] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const tempData=[];

  

  
  function handleNext() {
    setCurrentItemIndex(currentItemIndex + 1);
  }

  const handleChildDataColor = (childData) => {
    // setData(data.push(childData));
    tempData.push(childData);
  // console.log(tempData);

  };
  const handleChildDataFood = (childData) => {
    // setData(data.push(childData));
    tempData.push(childData);

  // console.log(tempData);

  };

  const handleChildDataGift = (childData) => {
    tempData.push(childData);
    setData(tempData);

    console.log(tempData);
    
    items.onChildData(tempData);
  }
  return(<div>
    {/* {
      items.map((item,i) => (
        <div key={i}>
          <h2>{item.question}</h2>
          <p>{item.question}</p>
        </div>
      ))
    } */}
    {
      items[currentItemIndex] && <GiftDetective
      question = {items[currentItemIndex].question}
      onChildData={items.indexOf(currentItemIndex)==0? handleChildDataColor: (items.indexOf(currentItemIndex)==1? handleChildDataFood:handleChildDataGift)}
      nextPage={items[currentItemIndex].nextPage} />
    }
      <button onClick={handleNext}>Next</button>
    {/* <GiftDetective goToNextComponent ={handleNext} question="Can you guess my favorite color?" onChildData ={handleChildDataColor}/>
    <GiftDetective goToNextComponent ={handleNext}question="Can you guess my favorite food?" onChildData ={handleChildDataFood}/>
    <GiftDetective nextPage = "/result"question="Can you guess my favorite Gift?" onChildData ={handleChildDataGift}/> */}
  </div>);
}




const GiftDetective = (props) => {
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [submitOnce, setSubmitOnce] = useState(false);
    const linkRef = useRef(null);
    // const [showResult, setShowResult] = useState(false);
    
    useEffect(()=>{
      setSelectedBoxes([]);
    setCorrectAnswers(0);
    setShowAnswer(false);
    setShowLoading(false);
    setSubmitOnce(false);
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
      answers.forEach((answer) => {
        if (selectedBoxes.includes(answer)) {
          correctIncrement++;
        }
      });

      setCorrectAnswers(correctAnswers + correctIncrement);

      console.log(correctIncrement+" is correct answers");
      
      //need to check this out
      props.onChildData(correctIncrement);
      /*
      props.onChildData({
        correctAnswers: correctIncrement,
        correctIndexes:answers,
        guesses: selectedBoxes});
      */
        setShowAnswer(true);
        // props.goToNextComponent();
        // linkRef.current.click();


        allAnswers.push(correctIncrement)

        console.log(linkRef);
        console.log(props.nextPage)




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
          <img src={imageUrl} alt="" />
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

        <button onClick={!submitOnce && selectedBoxes.length >2 ? handleSubmit : null }>answers</button>
          {/* <Link className='links'onClick={!submitOnce && selectedBoxes.length >=0 ? handleSubmit : null } to='/result'>Result</Link> */}
        
        
        {/* {showAnswer ? (
          <Link ref={linkRef} to='/result'>result</Link>
        ) : (
          <p>Keep guessing.</p>
        )} */}

      <Link ref={linkRef} to={props.nextPage}> Next---</Link>
        {correctAnswers}
      </div>
      
    );
  };


  function Resultpage(props) {

    return (
    <div>
        {/* {props.data.map((item,i) => { 
          console.log(item);
          return <p key={i}> you got {item.correctAnswers} </p>
  })} */}
  {props.data}
    </div>
    );
  }

export default App2;
