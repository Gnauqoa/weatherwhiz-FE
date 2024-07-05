import { Artist } from "./artist";

export type Music = {
  id: number;
  name: string;
  likes_count: number;
  liked: boolean;
  source_url: string;
  created_at: string;
  updated_at: string;
  image_url: string;
  duration_ms: number;
  artists: Artist[];
};
