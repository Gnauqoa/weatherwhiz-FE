import { Music } from "./music";
import { UserType } from "./user";

export type Playlist = {
  id: number;
  name: string;
  user: UserType;
  liked: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
  description: string;
  image_url: string;
  musics: Music[];
};
