import { Handler } from '@netlify/functions';
import { TwitterApi } from 'twitter-api-v2';

interface FollowerTweets {
  follower: Object;
  tweets: Array<Object>;
}

const handler: Handler = async (event, context) => {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken:
        process.env.TWITTER_ACCESS_TOKEN || event.queryStringParameters?.accessToken || '',
      accessSecret:
        process.env.TWITTER_ACCESS_TOKEN_SECRET ||
        event.queryStringParameters?.accessTokenSecret ||
        '',
    });
    const { data: user } = await client.v2.me();
    const { data: followers } = await client.v2.followers(user.id);
    const followerTweets: Array<FollowerTweets> = [];
    for (const follower of followers) {
      const { data: tweets } = await client.v2.get(`users/${follower.id}/tweets`);
      followerTweets.push({ follower, tweets });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(followerTweets),
    };
  } catch (_error) {
    console.log('_error', _error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'There was an error in connecting to the Twitter API' }),
    };
  }
};

export { handler };
