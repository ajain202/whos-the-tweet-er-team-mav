/* eslint-disable @typescript-eslint/no-loop-func */
import { User } from 'firebase/auth';
import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebase/firebase-client';
import { FollowingTweets, Question, Tweet } from '../models/models';

declare const stringSimilarity: any;

function scoreConverter(number: number) {
  const score = Math.floor(number * 5);
  return score === 0 ? 1 : score;
}

function generateQuestions(followingTweets: FollowingTweets | any, session: User | null) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const questions: Array<Question> = [];
      if (session?.uid) {
        const generatedQuestionSet = new Set();
        const usedRandomTweetSet = new Set();
        let scoreThreshold: number = 0;
        let usedTweets: DocumentData = [];
        let dataSetLength: number = 0;

        const userUsedTweetRef = doc(firestoreDB, 'usedTweets', session?.uid);
        const docSnap = await getDoc(userUsedTweetRef);
        if (docSnap.exists()) {
          usedTweets = docSnap.data();
        } else {
          setDoc(userUsedTweetRef, {
            tweets: [],
          });
        }

        const unusedTweets = followingTweets
          .map(({ following, tweets }: FollowingTweets) => ({
            following,
            tweets: tweets.filter(({ id }: Tweet) => !usedTweets.tweets.includes(id)),
          }))
          .filter(({ tweets }: FollowingTweets) => tweets.length > 0);
        if (!(unusedTweets.length > 1)) {
          resolve(questions);
        }
        unusedTweets.forEach((x: FollowingTweets) => {
          dataSetLength += x.tweets.length;
        });
        while (scoreThreshold <= 20 && dataSetLength > usedRandomTweetSet.size) {
          const randomUser: FollowingTweets =
            unusedTweets[Math.floor(Math.random() * unusedTweets.length)];
          const randomTweet: Tweet =
            randomUser.tweets[Math.floor(Math.random() * randomUser.tweets.length)];

          if (!usedRandomTweetSet.has(randomTweet.id)) {
            usedRandomTweetSet.add(randomTweet.id);
            unusedTweets.forEach((x: FollowingTweets) => {
              if (x.following !== randomUser.following) {
                const similarity = stringSimilarity.findBestMatch(
                  randomTweet.text,
                  x.tweets.map(({ text }) => text),
                );
                const answer: string = x.following;
                const tweet: string = similarity.bestMatch.target;
                const tweetId = x.tweets[similarity.bestMatchIndex].id;
                if (!generatedQuestionSet.has(tweetId)) {
                  const option: Array<string> = [x.following, randomUser.following];
                  const score: number = scoreConverter(similarity.bestMatch.rating);
                  scoreThreshold += score;
                  generatedQuestionSet.add(randomTweet.id);
                  questions.push({ tweetId, tweet, option, answer, score });
                }
              }
            });
          }
        }
      }
      resolve(questions);
    } catch (error) {
      reject(error);
    }
  });
}
export default generateQuestions;
