interface InstagramComment {
  id: string;
  like_count: number;
  text: string;
  username: string;
}
export interface InstagramPost {
  caption: string;
  comments_count: number;
  comments: { data: InstagramComment[] };
  id: string;
  like_count: number;
  media_type: string;
  media_url: string;
  username: string;
}
