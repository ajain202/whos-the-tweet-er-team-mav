import { useState } from 'react';
import { Following, Question } from '../../models/models';
import Button from '../resusable-controls/button';
import QuestionCard from './question-card';

interface Props {
  questions: Array<Question>;
  following: Array<Following>;
  onExitHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function GameScreen({ questions, following, onExitHandler }: Props) {
  const [index, setIndex] = useState<number>(0);

  const onAnswerClickHandler = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clickedAnswer: string,
  ) => {
    if (questions[index].answer === clickedAnswer) {
      console.log('Correct');
    } else {
      console.log('Wrong');
    }
    setIndex(index + 1);
  };

  return index < questions.length ? (
    <QuestionCard
      question={questions[index]}
      following={following}
      onAnswerClickHandler={onAnswerClickHandler}
    />
  ) : (
    <div>
      <Button label="Exit" type="button" onClick={onExitHandler} />
    </div>
  );
}

export default GameScreen;
