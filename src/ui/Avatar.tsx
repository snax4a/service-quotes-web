import React, { useState } from "react";
import Image from "next/image";

export const avatarSizeMap = {
  default: "40px",
  xl: "80px",
  lg: "60px",
  md: "50px",
  sm: "30px",
  xs: "20px",
};

export interface AvatarProps {
  src: string;
  size?: keyof typeof avatarSizeMap;
  className?: string;
  isBase64?: boolean;
  username?: string;
  onError?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src = "",
  className = "",
  size = "default",
  isBase64 = true,
  username = "",
  onError,
}) => {
  const [isError, setError] = useState(false);
  const imgSrc = isBase64 ? `data:image/png;base64,${src}` : src;

  return (
    <Image
      src={
        isError
          ? `https://ui-avatars.com/api/${
              username ? `?name=${username}` : "&name"
            }&background=3f8cff&bold=true&color=FFFFFF`
          : imgSrc
      }
      layout="fixed"
      width={avatarSizeMap[size]}
      height={avatarSizeMap[size]}
      className={`rounded-full ${className}`}
      onError={onError ? onError : () => setError(true)}
    />
  );
};
