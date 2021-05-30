import * as React from "react";

function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={21}
            height={10}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.5 9l-4-4m0 0l4-4m-4 4h18"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgArrowLeft;
