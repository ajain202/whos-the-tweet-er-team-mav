import { Score } from '../../models/models';

interface Props {
  score: Score;
}

function ScoreCard({ score }: Props) {
  return (
    <div className="select-none flex flex-1 items-center p-4">
      <div className="flex-1 pl-1 mr-16">
        <div className="font-medium">{score.name}</div>
        <div className="text-gray-600 text-sm">@{score.username}</div>
      </div>
      <div className="text-gray-600 font-medium text-lg">{score.score}</div>
    </div>
  );
}

export default ScoreCard;
