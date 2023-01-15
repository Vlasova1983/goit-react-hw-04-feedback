import {useState} from "react";
import{ Container }  from '../components/App.styled'
import {Section} from './Section/Section';
import {FeedbackOptions} from './Feedback/Feedback';
import {Statistics} from './Statistics/Statistics';
import {Notification} from './Notification/Notification';

export const App=()=> {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleClick = event => { 
    const { name } = event.target;
    setFeedback(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const countTotalFeedback=()=> {
    return feedback.good+feedback.bad+feedback.neutral;   
  }

  const countPositiveFeedbackPercentage=()=>{
   return Number((feedback.good/countTotalFeedback()*100).toFixed(1))    
  }  
  
  const total = countTotalFeedback();
  const positiveFeedbak = countPositiveFeedbackPercentage();        
  return (
    <Container>        
      <Section title="Please leave feedback">
        <FeedbackOptions 
          options={Object.keys(feedback)}
          onLeaveFeedback={handleClick} 
        /> 
        </Section>  
        {total===0 ? <Notification message = "There is no feedback"/>:
        <Section title="Statistics">
        <Statistics 
          good={feedback.good} 
          neutral={feedback.neutral} 
          bad={feedback.bad} 
          total={total} 
          positiveFeedbak={positiveFeedbak}
        />                   
      </Section>}                  
    </Container>        
  );     
};
