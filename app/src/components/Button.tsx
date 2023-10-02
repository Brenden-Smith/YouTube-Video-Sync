"use client";
import {
  ButtonHTMLAttributes,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import Loading from "./Loading";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  loading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const color = useMemo(() => {
    switch (variant) {
      case "primary":
        return pressed ? "bg-blue-700" : hover ? "bg-blue-600" : "bg-blue-500";
      case "secondary":
        return pressed ? "bg-gray-700" : hover ? "bg-gray-600" : "bg-gray-500";
      default:
        return "";
    }
  }, [variant, pressed, hover]);

  const className = useMemo(
    () =>
      `${
        props.className ?? ""
      } transition-colors px-4 py-2 rounded-md text-red flex flex-row items-center ${color}`,
    [props.className, color]
  );
  const press = useCallback(() => setPressed(true), []);
  const release = useCallback(() => {
    setPressed(false);
    setHover(false);
  }, []);
  const hoverIn = useCallback(() => setHover(true), []);

  return (
    <button
      {...props}
      className={className}
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      onTouchStart={press}
      onTouchEnd={release}
      onTouchCancel={release}
      onMouseEnter={hoverIn}
    >
      <Loading enabled={loading} />
      {children}
    </button>
  );
}
