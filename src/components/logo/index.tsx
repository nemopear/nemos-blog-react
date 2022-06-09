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
        <a href="#" className="flex items-center">
          {hasImage && (
            <span className="inline-block h-10 w-10 relative rounded-full overflow-hidden mr-2">
              <Image
                layout="fill"
                src="https://media.graphcms.com/output=format:jpg/resize=,height:800,fit:max/FWUnmkz9Ruqwt34qsNZ7"
              />
            </span>
          )}
          <span
            className={`text-xl uppercase tracking-wider font-semibold leading-5 ${
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
