import { User } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestoreDB } from '../../firebase/firebase-client';
import { Score } from '../../models/models';
import ScoreCard from '../resusable-controls/score-card';
import Leaderboard from './leaderboard';

function ScoreBoard({ session }: { session: User | null }) {
  const [scores, setScores] = useState<Array<Score>>([]);

  useEffect(() => {
    const q = query(collection(firestoreDB, 'score'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot) {
        const tempscores: Array<Score> = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            const score = doc.data() as Score;
            tempscores.push({ ...score, id: doc.id });
          }
        });
        tempscores.sort((a, b) => b.score - a.score);
        setScores(tempscores);
      }
    });
    return unsubscribe;
  }, []);

  const currentUserScore = scores.find(({ id }) => id === session?.uid);
  return (
    <div className="w-full">
      {session && (
        <>
          <p className="font-semibold text-lg mb-2">Your Score</p>
          <div className="bg-[#f7f9f9] rounded-lg shadow-md hover:bg-[rgba(0,0,0,0.05)]">
            {currentUserScore && <ScoreCard score={currentUserScore} />}
          </div>
        </>
      )}
      {scores.length > 0 && <Leaderboard scores={scores} />}
    </div>
  );
}

export default ScoreBoard;
