import * as React from "react";

function SvgOutlineDollar(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 7.111c-2.025 0-3.667 1.094-3.667 2.445C8.333 10.906 9.975 12 12 12s3.667 1.094 3.667 2.444c0 1.351-1.642 2.445-3.667 2.445V7.11zm0 0c1.357 0 2.542.491 3.177 1.222L12 7.111zm0 0V5.89 7.11zm0 0v9.778V7.11zm0 9.778v1.222-1.222zm0 0c-1.357 0-2.542-.491-3.177-1.222L12 16.889zM23 12a11 11 0 11-22 0 11 11 0 0122 0z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgOutlineDollar;
