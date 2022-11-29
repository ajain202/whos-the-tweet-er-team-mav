/* eslint-disable @typescript-eslint/no-loop-func */
import { User } from 'firebase/auth';
import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/firebase-client';
import { FollowingTweets, Question } from '../models/models';
import shuffleArray from './shuffle-array';

declare const stringSimilarity: any;

function scoreConverter(number: number) {
  const score = Math.floor(number * 5);
  return score === 0 ? 1 : score;
}

function generateQuestions(
  followingTweets: Array<FollowingTweets> | any,
  session: User | null,
): Promise<Array<Question>> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const questions: Array<Question> = [];
      if (session?.uid) {
        let scoreThreshold = 0;
        let totalTweets = 0;
        const generatedQuestionSet = new Set();
        const usedRandomTweetSet = new Set();
        let usedTweets: DocumentData = [];

        const userUsedTweetRef = doc(firestoreDB, 'usedTweets', session?.uid);
        const docSnap = await getDoc(userUsedTweetRef);
        if (docSnap.exists()) {
          usedTweets = docSnap.data();
        } else {
          setDoc(userUsedTweetRef, {
            tweets: [],
          });
        }

        const unusedTweets: Array<FollowingTweets> = followingTweets
          .map(({ following, tweets }: FollowingTweets) => ({
            following,
            tweets: tweets.filter(({ id }) => !usedTweets.tweets.includes(id)),
          }))
          .filter(({ tweets }: FollowingTweets) => tweets.length > 0);
        if (!(unusedTweets.length > 1)) {
          resolve(questions);
        }

        unusedTweets.forEach(({ tweets }) => {
          totalTweets += tweets.length;
        });

        while (scoreThreshold <= 20 && totalTweets > usedRandomTweetSet.size) {
          const randomUser = unusedTweets[Math.floor(Math.random() * unusedTweets.length)];
          const randomTweet =
            randomUser.tweets[Math.floor(Math.random() * randomUser.tweets.length)];

          if (!usedRandomTweetSet.has(randomTweet.id)) {
            usedRandomTweetSet.add(randomTweet.id);

            unusedTweets.forEach(({ following, tweets }) => {
              if (following !== randomUser.following) {
                const similarity = stringSimilarity.findBestMatch(
                  randomTweet.text,
                  tweets.map(({ text }) => text),
                );
                const answer = following;
                const tweet = similarity.bestMatch.target;
                const tweetId = tweets[similarity.bestMatchIndex].id;
                if (!generatedQuestionSet.has(tweetId)) {
                  const option = shuffleArray([following, randomUser.following]);
                  const score = scoreConverter(similarity.bestMatch.rating);
                  scoreThreshold += score;
                  generatedQuestionSet.add(tweetId);
                  questions.push({ tweetId, tweet, option, answer, score });
                }
              }
            });
          }
        }
      }
      resolve(shuffleArray(questions));
    } catch (error) {
      reject(error);
    }
  });
}
export default generateQuestions;
