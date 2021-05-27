import React from "react";
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
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  className = "",
  size = "default",
  isBase64 = true,
}) => {
  const imgSrc = isBase64 ? `data:image/png;base64,${src}` : src;

  return (
    <Image
      src={imgSrc}
      layout="fixed"
      width={avatarSizeMap[size]}
      height={avatarSizeMap[size]}
      className={`rounded-full ${className}`}
    />
  );
};
