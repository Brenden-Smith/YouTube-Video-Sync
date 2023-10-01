import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Slider(
  props: Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "className" & "value"
  >
) {
  return (
    <div className="relative w-full h-2">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 rounded-lg"></div>
      <div
        className={`absolute top-0 bottom-0 left-0 ${props.disabled ? "bg-gray-400" : "bg-blue-500"} rounded-lg h-2`}
        style={{
          width: `${
            (((props.value as number) ?? 0) / ((props.max as number) ?? 1)) *
            100
          }%`,
        }}
      ></div>
      <input
        type="range"
        className={`absolute top-0 bottom-0 left-0 right-0 w-full h-2 opacity-0 ${!props.disabled && "cursor-pointer"}`}
        {...props}
      />
    </div>
  );
}
