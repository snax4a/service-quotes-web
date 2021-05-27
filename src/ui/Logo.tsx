import React from "react";
import Link from "next/link";
import { useScreenType } from "../shared-hooks/useScreenType";

export const Logo: React.FC = () => {
  const screenType = useScreenType();
  const isDesktop = screenType === "3-cols";

  return (
    <Link href="/dashboard">
      <a
        className={`flex text-4xl font-semibold pb-6.5 ${
          isDesktop ? "flex-col pl-5" : ""
        }`}
        style={{
          lineHeight: "40px",
          letterSpacing: "-1px",
        }}
      >
        <h1 className="text-primary-800">{isDesktop ? "Service" : "S"}</h1>
        <h1 className="text-orange">{isDesktop ? "Quotes" : "Q"}</h1>
      </a>
    </Link>
  );
};
