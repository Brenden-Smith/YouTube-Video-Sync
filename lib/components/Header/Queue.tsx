import {
  Card,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRoom } from "../../context";
import axios from "axios";
import { useState } from "react";
import { Video } from "../../models";
import { motion, AnimatePresence } from "framer-motion";

export function Queue({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { id, data } = useRoom();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const items: Record<string, Video> =
    data?.child("queue").child("items").val() || {};

  async function addToQueue() {
    if (input !== "") {
      setLoading(true);
      setError(null);
      var regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = input.match(regExp);
      if (match && match[2].length === 11) {
        await axios
          .post(`/api/queue/add?videoId=${match[2].toString()}&roomId=${id}`)
          .catch((error) => {
            setError(error.message);
          });
      } else {
        setError("Invalid URL");
      }
    } else {
      setError("Input required");
    }
    setInput("");
    setLoading(false);
  }

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={() => {
        setOpen(false);
        setError(null);
        setInput("");
      }}
    >
      <Stack spacing={2} p={2} alignItems="center" sx={{ width: "100vw" }}>
        <AnimatePresence>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              paddingLeft: "15px",
              width: "100vw",
              overflowX: "auto",
            }}
          >
            {Object.keys(items).length > 0 ? (
              Object.keys(items).map((item, key) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    sx={{
                      height: "175px",
                      width: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundImage: `url(${items[item].videoThumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Stack
                      sx={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                      }}
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography variant="h5">
                        {items[item].videoTitle}
                      </Typography>
                      <Typography>{items[item].channelTitle}</Typography>
                    </Stack>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                style={{
                  height: "175px",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Typography variant="h5">No items in queue</Typography>
              </motion.div>
            )}
          </Stack>
        </AnimatePresence>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100vw",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            sx={{ width: "33%" }}
            placeholder="Enter YouTube URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={error !== null}
            helperText={error}
          />
          <div>
            <IconButton onClick={addToQueue}>
              {loading ? (
                <CircularProgress sx={{ color: "white", fontSize: 8 }} />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </div>
        </Stack>
      </Stack>
    </Drawer>
  );
}
