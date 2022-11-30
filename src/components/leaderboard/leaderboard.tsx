import { collection, DocumentData, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestoreDB } from '../../firebase/firebase-client';

function Leaderboard() {
  const [scores, setScores] = useState<Array<DocumentData>>([]);
  useEffect(() => {
    const q = query(collection(firestoreDB, 'score'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot) {
        const tempscores: Array<DocumentData> = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            tempscores.push(doc.data());
          }
        });
        tempscores.sort((a, b) => b.score - a.score);
        setScores(tempscores);
      }
    });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full items-center">
      <div className="bg-white rounded-lg shadow-md">
        <ul className="flex flex-col divide divide-y">
          {scores.map(({ name, username, score }) => (
            <li key={username} className="flex flex-row">
              <div className="select-none flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium">{name}</div>
                  <div className="text-gray-600 text-sm">@{username}</div>
                </div>
                <div className="text-gray-600 font-medium text-lg">{score}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
