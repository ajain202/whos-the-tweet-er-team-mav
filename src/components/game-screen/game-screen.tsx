import { User } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaceIdError } from 'tabler-icons-react';
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

  const onAnswerClickHandler = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clickedAnswer: string,
  ) => {
    const toastId = toast.loading('Hmmmm checking your answer');
    try {
      await updateScore(questions[index], clickedAnswer, session);
      if (clickedAnswer === questions[index].answer) {
        toast.success(
          `Correct!! Are you sure you arent cheating? +${questions[index].score} point(s)`,
          {
            id: toastId,
          },
        );
      } else {
        toast.error(`Wrong Answer are you even trying LOL -${questions[index].score} point(s)`, {
          id: toastId,
        });
      }
      setIndex(index + 1);
    } catch (_error) {
      toast.remove(toastId);
      toast("Why Database why??? couldn't update your score try again", { icon: <FaceIdError /> });
    }
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
