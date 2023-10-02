"use client";

import { ReactNode, useCallback, useMemo } from "react";
import IconButton from "./IconButton";
import Image from "next/image";

export type DrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: "left" | "right";
  title: string;
  children?: ReactNode;
  topComponent?: ReactNode;
};

export default function Drawer({
  open,
  setOpen,
  position,
  title,
  children,
  topComponent,
}: DrawerProps) {
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const pos = useMemo(() => {
    switch (position) {
      case "right":
        return "top-0 right-0 translate-x-full";
      case "left":
        return "top-0 left-0 -translate-x-full";
      default:
        return "top-0 left-0 -translate-y-full";
    }
  }, [position]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black opacity-0 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-50 z-[1044]" : "z-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed ${pos} z-[1045] flex w-96 h-screen flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out dark:bg-neutral-800 dark:text-neutral-200 ${
          open ? "transform-none" : ""
        }`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-4">
          <h5 className="mb-0 font-semibold leading-normal">{title}</h5>
          <IconButton onClick={onClose}>
            <Image
              src="/close.svg"
              alt="Close button"
              width={24}
              height={24}
              style={{
                filter: "invert(1)",
              }}
            />
          </IconButton>
        </div>
        <div className="flex items-center justify-between p-4">
          {topComponent}
        </div>
        <div className="flex-grow overflow-y-auto p-4">{children}</div>
      </div>
    </>
  );
}
