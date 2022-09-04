import { Avatar, AvatarGroup, IconButton, Stack, Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRoom } from "../../context";
import { useState } from "react";
import { Queue } from "./Queue";
import { LocalUser } from "../../models";
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";

export function Header() {
  const { visible, data } = useRoom();
  const [open, setOpen] = useState(false);
  const users: Record<string, LocalUser> = data?.child("users").val() || {};
  const router = useRouter();

  return (
    <>
      <Queue open={open} setOpen={setOpen} />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Tooltip title="Queue">
                <IconButton onClick={() => setOpen(true)}>
                  <AddToQueueIcon />
                </IconButton>
              </Tooltip>
              <AvatarGroup>
                {Object.keys(users).map((user, key) => (
                  <Tooltip title={users[user].displayName} key={key}>
                    <Avatar>
                      <Image
                        src={users[user].photoURL}
                        layout="fill"
                        alt={users[user].displayName}
                      />
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
              <Tooltip title="Sign Out">
                <IconButton
                  onClick={async () => {
                    await signOut(getAuth());
                    router.push("/");
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
