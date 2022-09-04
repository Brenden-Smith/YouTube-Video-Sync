import {
  Avatar,
  AvatarGroup,
  IconButton,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRoom } from "../../context";
import { useState } from "react";
import { Queue } from "./Queue";
import { LocalUser } from "../../models";

export function Header() {
  const { visible, data } = useRoom();
  const [open, setOpen] = useState(false);
  const users: Array<LocalUser> = data?.child("users").val() || [];

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
              <IconButton onClick={() => setOpen(true)}>
                <AddToQueueIcon />
              </IconButton>
              <AvatarGroup>
                {users.map((user) => (
                  <Avatar
                    key={user.uid}
                    alt={user.displayName}
                    src={user.photoURL}
                  />
                ))}
              </AvatarGroup>
              <IconButton>
                <ExitToAppIcon />
              </IconButton>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
