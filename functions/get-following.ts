import { Handler } from '@netlify/functions';
import { TwitterApi } from 'twitter-api-v2';

const handler: Handler = async (event, _context) => {
  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY || '',
      appSecret: process.env.TWITTER_API_SECRET || '',
      accessToken: event.queryStringParameters.accessToken || '',
      accessSecret: event.queryStringParameters.accessSecret || '',
    });
    const { data: user } = await client.v2.me();
    const { data: following } = await client.v2.following(user.id, { max_results: 10 });

    return {
      statusCode: 200,
      body: JSON.stringify(Array.isArray(following) && following.length > 0 ? following : []),
    };
  } catch (_error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'There was an error in connecting to the Twitter API' }),
    };
  }
};

export { handler };
