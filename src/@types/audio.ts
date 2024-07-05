import { Music } from "./music";
import { Playlist } from "./playlist";

export type AudioContextType = {
  onNext: () => void;
  onPrev: () => void;
  setVolume: (volume: number) => void;
  setHide: (hide: boolean) => void;
  setOpen: (open: boolean) => void;
  volume: number;
  loading: boolean;
  open: boolean;
  hide: boolean;
  index: number;
  onStartPlaylist: (playlist: Playlist, index: number) => void;
  onTogglePlay: () => void;
  onPlaySong: (music: Music) => void;
  onSeek: (time: number | number[]) => void;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  currentMusic: Music | null;
  currentPlaylistId: number | null,
};
