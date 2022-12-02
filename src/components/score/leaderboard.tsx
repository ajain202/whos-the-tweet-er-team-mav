import { Score } from '../../models/models';
import ScoreCard from '../resusable-controls/score-card';

interface Props {
  scores: Array<Score>;
}

function Leaderboard({ scores }: Props) {
  return (
    <div className="w-full items-center mt-10">
      <p className="font-semibold text-lg mb-2">Leaderboards</p>
      <div className="bg-[#f7f9f9] rounded-lg shadow-md">
        <ul className="flex flex-col">
          {scores.map((score) => (
            <li key={score.username} className="flex flex-row hover:bg-[rgba(0,0,0,0.05)]">
              <ScoreCard score={score} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
