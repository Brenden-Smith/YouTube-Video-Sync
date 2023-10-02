import Video from "./Video";

type Room = {
  users: string[];
  position: number;
  queue: Video[];
  skipCooldown: boolean;
};

export default Room;
