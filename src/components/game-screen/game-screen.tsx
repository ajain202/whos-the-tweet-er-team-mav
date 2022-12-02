import { User } from 'firebase/auth';
import { useState } from 'react';
import { Following, Question } from '../../models/models';
import updateScore from '../../utilities/update-score';
import Button from '../resusable-controls/button';
import QuestionCard from './question-card';

interface Props {
  questions: Array<Question>;
  following: Array<Following>;
  onExitHandler: React.MouseEventHandler<HTMLButtonElement>;
  session: User;
}

function GameScreen({ questions, following, onExitHandler, session }: Props) {
  const [index, setIndex] = useState<number>(0);
  const [disableAnswerButton, setDisableButtonSubmit] = useState(false);

  const onAnswerClickHandler = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clickedAnswer: string,
  ) => {
    try {
      setDisableButtonSubmit(true);
      await updateScore(questions[index], clickedAnswer, session);
      setIndex(index + 1);
      setDisableButtonSubmit(false);
    } catch (_error) {
      alert('Something went wrong in updating score');
      setDisableButtonSubmit(false);
    }
  };

  return index < questions.length ? (
    <QuestionCard
      question={questions[index]}
      following={following}
      onAnswerClickHandler={onAnswerClickHandler}
      disableAnswerButton={disableAnswerButton}
    />
  ) : (
    <div>
      <Button label="Exit" type="button" onClick={onExitHandler} />
    </div>
  );
}

export default GameScreen;
