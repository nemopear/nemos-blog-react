import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  textClasses?: string;
  hasImage?: boolean;
};
export const Logo: React.FC<LogoProps> = ({ textClasses, hasImage }) => {
  return (
    <>
      <Link href="/">
        <a href="/" className="flex items-center">
          {hasImage && (
            <span className="relative mr-2 inline-block h-10 w-10 overflow-hidden rounded-full">
              <img
                layout="fill"
                src="https://media.graphcms.com/output=format:jpg/resize=,height:800,fit:max/FWUnmkz9Ruqwt34qsNZ7"
              />
            </span>
          )}
          <span
            className={`text-xl font-semibold uppercase leading-5 tracking-wider ${
              textClasses !== undefined ? textClasses : ""
            }`}
          >
            Nemo's
            <br />
            blog
          </span>
        </a>
      </Link>
    </>
  );
};
