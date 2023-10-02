"use client";
import {
  ButtonHTMLAttributes,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

export type IconButtonProps = {
  loading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({
  loading,
  children,
  ...props
}: IconButtonProps) {
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);
  const color = useMemo(
    () => (pressed ? "bg-gray-600" : hover ? "bg-gray-500" : ""),
    [pressed, hover]
  );

  const className = useMemo(
    () =>
      `${
        props.className ?? ""
      } transition-colors rounded-full p-1 flex flex-row items-center ${color}`,
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
      className={className}
      {...props}
      onMouseDown={press}
      onMouseUp={release}
      onMouseLeave={release}
      onTouchStart={press}
      onTouchEnd={release}
      onTouchCancel={release}
      onMouseEnter={hoverIn}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M12 2C6.477 2 2 6.477 2 12"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
      {children}
    </button>
  );
}
