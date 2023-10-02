import Drawer from "@/components/Drawer";

type ChatProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Chat({ setOpen, open }: ChatProps) {
  return <Drawer open={open} setOpen={setOpen} position="right" title="Chat" />;
}
