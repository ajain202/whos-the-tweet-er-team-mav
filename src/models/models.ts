export interface Following {
  id: string;
  name: string;
  username: string;
  selected?: boolean;
}

export interface Tweet {
  id: string;
  text: string;
}

export interface FollowingTweets {
  following: string;
  tweets: Array<Tweet>;
}

export interface Question {
  tweetId: string;
  tweet: string;
  option: Array<string>;
  answer: string;
  score: number;
}

export interface Score {
  name: string;
  username: string;
  score: number;
  id: string;
}
