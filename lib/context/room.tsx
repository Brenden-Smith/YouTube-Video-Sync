import {
  DataSnapshot,
  getDatabase,
  onDisconnect,
  ref,
  set,
} from "firebase/database";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useObject } from "react-firebase-hooks/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../services/firebase";
import { useRouter } from "next/router";

type Room = {
  id: string;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  time: number;
  setTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: DataSnapshot | undefined;
  changing: boolean;
  setChanging: (changing: boolean) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
};

export const RoomContext = createContext<Room>({} as Room);

export const RoomProvider = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visible, setVisible] = useState(false);
  const [changing, setChanging] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(25);
  const [data] = useObject(ref(getDatabase(), `rooms/${id}`));
  const router = useRouter();

  useEffect(() => {}, [id]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userRef = ref(
          getDatabase(),
          `rooms/${id}/users/${getAuth().currentUser?.uid}`
        );
        set(userRef, {
          displayName: getAuth().currentUser?.displayName,
          photoURL: getAuth().currentUser?.photoURL,
          uid: getAuth().currentUser?.uid,
        });
        onDisconnect(userRef).remove();
      } else
        router.replace("/login?redirect=" + encodeURIComponent("/room/" + id));
    });
  }, [id, router]);

  return (
    <RoomContext.Provider
      value={{
        id,
        playing,
        setPlaying,
        time,
        setTime,
        duration,
        setDuration,
        visible,
        setVisible,
        data,
        changing,
        setChanging,
        muted,
        setMuted,
        volume,
        setVolume,
      }}
    >
      {data && children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
