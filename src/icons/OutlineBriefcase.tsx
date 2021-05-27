import * as React from "react";

function SvgOutlineBriefcase(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 12.255A23.88 23.88 0 0110.01 14c-3.183 0-6.23-.62-9.01-1.745M10 11h.01M14 5V3a2 2 0 00-2-2H8a2 2 0 00-2 2v2h8zM3 19h14a2 2 0 002-2V7a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgOutlineBriefcase;
