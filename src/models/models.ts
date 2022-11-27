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
