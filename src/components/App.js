import { GlobalStyle } from './GlobalStyle';
import { Notifi } from './Notification/Notifi';
import { Buttons } from './Buttons/Buttons';
import { Statistics } from './Statistics/Statistics';
import { Sections } from './Sections/Sections';
import { useState } from 'react';

export const App = () => {
  const [feedbackState, setFeedbackState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalFeedback = () => {
    return feedbackState.good + feedbackState.neutral + feedbackState.bad;
  };

  const total = totalFeedback();

  const handleFeedback = option => {
    setFeedbackState(prevState => ({
      ...prevState,
      [option]: prevState[option] + 1,
    }));
  };

  const feedbackPercentage = () => {
    const totalFeedbacksNumber = totalFeedback();
    if (totalFeedbacksNumber === 0) {
      return 0;
    }

    return Math.floor((feedbackState.good / totalFeedbacksNumber) * 100);
  };

  return (
    <>
      <Sections title="Please leave feedback">
        <Buttons
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Sections>
      <Sections title="Statistics">
        {total === 0 ? (
          <>
            <Notifi message="There is no feedback" />
          </>
        ) : (
          <Statistics
            good={feedbackState.good}
            neutral={feedbackState.neutral}
            bad={feedbackState.bad}
            totalFeedback={totalFeedback()}
            positivePercentage={feedbackPercentage()}
          />
        )}
      </Sections>
      <GlobalStyle />
    </>
  );
};
