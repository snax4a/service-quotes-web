import React, { LegacyRef, ReactElement } from "react";

export interface SettingsIconProps {
  a?: {
    href: string;
    download?: string;
    ref?: LegacyRef<HTMLAnchorElement>;
  };
  icon?: ReactElement;
  label?: string;
  trailingIcon?: ReactElement;
  classes?: string;
  transition?: boolean;
  onClick?: () => void;
  last?: boolean;
  transparent?: boolean;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({
  a,
  icon,
  label,
  trailingIcon,
  classes = "",
  transition,
  transparent = false,
  onClick,
  last,
}) => {
  const text = transparent
    ? `text-primary-500 text-xs`
    : `text-primary-100 text-sm`;
  const bg = transparent
    ? `bg-transparent border-primary-200 md:hover:bg-primary-100`
    : `border-primary-700 md:hover:bg-primary-750`;
  const cn = `
      flex w-full items-center px-4 py-2 cursor-pointer
       ${last ? "" : "border-b"} ${
    transition ? `transition duration-200 ease-out` : ``
  } ${bg} ${classes}`;

  if (a) {
    return (
      <a
        ref={a.ref}
        href={a.href}
        download={a.download}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cn} text-primary-100`}
      >
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cn}>
      {icon}
      <span className={`flex md:ml-2 ml-4 flex-1 ${text}`}>{label}</span>
      {trailingIcon ? trailingIcon : null}
    </button>
  );
};
