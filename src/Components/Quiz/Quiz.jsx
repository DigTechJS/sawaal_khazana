import { useState,useRef } from 'react'
import {questions} from '../../assets/quizData'
import './quiz.css'
const Quiz = () => {
  let [index, setIndex]=useState(0);
  let [question, setQuestion]=useState(questions[index]);
  let [lock, setLock]=useState(false)
  let [score,setScore]=useState(0);
  let [selected, setSelected]=useState(-1);
  let [result, setResult]=useState(false);
  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);

  let option_array=[Option1, Option2, Option3, Option4]

  const checkAnswer=(e)=>{
    if(lock===false){
      
      if (question.correctAnswer===e.target.textContent) {
        e.target.classList.add("correct");
        setScore((prev)=>prev+1);
        setSelected(2);

      }
      else{
        e.target.classList.add("wrong");
        const idx=question.correctAnswer===question.option1?0:question.correctAnswer===question.option2?1:question.correctAnswer===question.option3?2:3;
        option_array[idx].current.classList.add("correct");
        setSelected(1);
      }
      setLock(true);
    }
    
  }
  const next=()=>{
    if(lock===true){
      if(index===questions.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index)
      setQuestion(questions[index]);
      setLock(false);
      setSelected(-1);
      option_array.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })

    }
  }
  const reset=()=>{
    setIndex(0);
    setQuestion(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setSelected(-1);

  }
  return (
    <div className="container">
        <h1>Sawaal Khazana</h1>
        <hr/>
        {result?<>
        <h2>You scored {score} out of {questions.length}</h2>
        <button onClick={reset}>Reset</button>
        </>:
        <>
          <h2>{index+1}. {question.question}</h2>
          <ul>
              <li ref={Option1} onClick={(e)=>{checkAnswer(e)}}>{question.option1}</li>
              <li ref={Option2} onClick={(e)=>{checkAnswer(e)}}>{question.option2}</li>
              <li ref={Option3} onClick={(e)=>{checkAnswer(e)}}>{question.option3}</li>
              <li ref={Option4} onClick={(e)=>{checkAnswer(e)}}>{question.option4}</li>
              
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index+1} of {questions.length} quesions</div>
          <div className="index result">{
            selected!==-1&&(selected===2?"Correct Answer":"Wrong Answer")
            }</div>
        </>
        
        }

        
    </div>
  )
}

export default Quiz