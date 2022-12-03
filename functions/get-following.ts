import { Handler } from '@netlify/functions';
import { TwitterApi } from 'twitter-api-v2';
import { Following } from '../src/models/models';
import shuffleArray from '../src/utilities/shuffle-array';
import { decryptData } from '../src/utilities/encryption';

const handler: Handler = async (event, _context) => {
  try {
    const { accessToken, accessSecret, eat } = JSON.parse(
      decryptData(event.queryStringParameters.token),
    );
    if (eat && eat > Date.now()) {
      const client = new TwitterApi({
        appKey: process.env.TWITTER_API_KEY || '',
        appSecret: process.env.TWITTER_API_SECRET || '',
        accessToken: accessToken || '',
        accessSecret: accessSecret || '',
      });

      const { data: user } = await client.v2.me();
      const { data: following } = await client.v2.following(user.id, { max_results: 100 });

      const followingList: Array<Following> = [];
      if (Array.isArray(following) && following.length > 0) {
        followingList.push(...shuffleArray(following).splice(0, 10));
      }

      return {
        statusCode: 200,
        body: JSON.stringify(followingList),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized access' }),
      };
    }
  } catch (_error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'There was an error in connecting to the Twitter API' }),
    };
  }
};

export { handler };
