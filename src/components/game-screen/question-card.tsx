import { Following, Question } from '../../models/models';
import Pill from '../resusable-controls/pill';
import TweetCard from './tweet-card';

interface Props {
  question: Question;
  score: number;
  following: Array<Following>;
  onAnswerClickHandler: Function;
  disableAnswerButton: boolean;
}

function QuestionCard({
  question,
  score,
  following,
  onAnswerClickHandler,
  disableAnswerButton,
}: Props) {
  const userDetailsMap = new Map();
  following.forEach(({ id, name, username }) => {
    userDetailsMap.set(id, { name, username });
  });

  const { option } = question;

  return (
    <>
      <TweetCard question={question} score={score} />

      <div className="mt-5 flex justify-around w-full">
        <Pill
          type="button"
          disabled={disableAnswerButton}
          primaryLabel={userDetailsMap.get(option[0]).name}
          secondaryLabel={`@${userDetailsMap.get(option[0]).username}`}
          onClick={(e) => {
            onAnswerClickHandler(e, option[0]);
          }}
        />
        <Pill
          type="button"
          disabled={disableAnswerButton}
          primaryLabel={userDetailsMap.get(option[1]).name}
          secondaryLabel={`@${userDetailsMap.get(option[1]).username}`}
          onClick={(e) => {
            onAnswerClickHandler(e, option[1]);
          }}
        />
      </div>
    </>
  );
}

export default QuestionCard;
