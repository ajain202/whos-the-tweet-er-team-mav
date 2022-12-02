import { User } from 'firebase/auth';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { firestoreDB } from '../firebase/firebase-client';
import { Question } from '../models/models';

function updateScore(
  question: Question,
  clickedAnswer: string,
  session: User,
  toastId: string,
): Promise<void> {
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
        toast.success('Correct!! Are you sure you arent cheating?', {
          id: toastId,
        });
      } else {
        toast.error('Wrong Answer are you even trying LOL', {
          id: toastId,
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export default updateScore;
