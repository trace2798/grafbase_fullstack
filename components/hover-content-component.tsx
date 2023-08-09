import React from "react";

interface HoverContentComponentProps {
  type: string;
  functionality: string;
  note: string;
}

export const HoverContentComponent: React.FC<HoverContentComponentProps> = ({
  type,
  functionality,
  note,
}) => {
  return (
    <div className="text-left">
      <p className="py-2">
        Type:{" "}
        <span className="text-zinc-700 dark:text-neutral-400">{type}</span>
      </p>
      <p className="py-2">
        Functionality:
        <span className="text-zinc-700 dark:text-neutral-400">
          {" "}
          {functionality}
        </span>
      </p>
      <p className="py-2">
        Note:
        <span className="text-zinc-700 dark:text-neutral-400"> {note}</span>
      </p>
    </div>
  );
};
