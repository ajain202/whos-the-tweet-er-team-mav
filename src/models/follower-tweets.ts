export interface Follower {
  id: string;
  name: string;
  username: string;
}

export interface Tweet {
  id: string;
  text: string;
}

export interface FollowerTweets {
  follower: Follower;
  tweets: Array<Tweet>;
}
