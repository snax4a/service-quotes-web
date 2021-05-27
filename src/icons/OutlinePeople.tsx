import * as React from "react";

function SvgOutlinePeople(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 17h5v-2a3 3 0 00-5.356-1.857L16 17zm0 0H6h10zm0 0v-2c0-.656-.126-1.283-.356-1.857L16 17zM6 17H1v-2a3 3 0 015.356-1.857L6 17zm0 0v-2c0-.656.126-1.283.356-1.857L6 17zm.356-3.857a5.003 5.003 0 019.288 0H6.356zM14 4a3 3 0 11-6 0 3 3 0 016 0v0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM6 7a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgOutlinePeople;
