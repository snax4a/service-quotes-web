import * as React from "react";

function SvgSolidCheck(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="solid-check_svg__h-5 solid-check_svg__w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default SvgSolidCheck;
