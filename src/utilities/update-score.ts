import { User } from 'firebase/auth';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { firestoreDB } from '../firebase/firebase-client';
import { Question } from '../models/models';

function updateScore(question: Question, clickedAnswer: string, session: User): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const userScoreRef = doc(firestoreDB, 'score', session.uid);
      const { answer, score, tweetId } = question;
      await updateDoc(userScoreRef, {
        score: increment(answer === clickedAnswer ? score : -score),
      });
      if (answer === clickedAnswer) {
        const userUsedTweetRef = doc(firestoreDB, 'usedTweets', session.uid);
        await updateDoc(userUsedTweetRef, { tweets: arrayUnion(tweetId) });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export default updateScore;
