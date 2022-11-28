import { Handler } from '@netlify/functions';
import { TwitterApi } from 'twitter-api-v2';
import { FollowingTweets } from '../src/models/models';

const handler: Handler = async (event, _context) => {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: event.queryStringParameters.accessToken || '',
      accessSecret: event.queryStringParameters.accessSecret || '',
    });

    const followingList: Array<string> = event.queryStringParameters.following?.split(',') || [];
    const followingTweets: Array<FollowingTweets> = [];

    for (const following of followingList) {
      const { data: tweets } = await client.v2.get(`users/${following}/tweets`, {
        max_results: 100,
        exclude: 'retweets,replies',
      });
      followingTweets.push({ following, tweets });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(followingTweets),
    };
  } catch (_error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'There was an error in connecting to the Twitter API' }),
    };
  }
};

export { handler };
