import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { graphCms } from "src/lib/graphCms";

export const Header: React.FC = () => {
  const [categoryLinks, setCategoryLinks] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const { categories } = await graphCms.request(`
            query MyQuery {
                categories {
                color {
                    css
                }
                name
                }
            }          
            `);
      setCategoryLinks(categories);
    };
    getCategory();
  }, []);
  return (
    <header className="relative z-20">
      <div className="py-4 px-5">
        <nav
          className="relative flex items-center justify-between sm:h-10"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a href="#" className="flex items-center">
                  <span className="inline-block h-10 w-10 relative rounded-full overflow-hidden">
                    <Image
                      layout="fill"
                      src="https://media.graphcms.com/output=format:jpg/resize=,height:800,fit:max/FWUnmkz9Ruqwt34qsNZ7"
                    />
                  </span>
                  <span className="text-xl uppercase tracking-wider font-semibold leading-5 ml-2">
                    Nemo's
                    <br />
                    blogs
                  </span>
                </a>
              </Link>
            </div>
          </div>
          {/* <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <ul className="flex items-center justify-between lg:justify-start">
              {categoryLinks.map((link) => (
                <li key={link.name} className="mr-10">
                  <Link href={`/${link.name}`}>
                    <a className="font-medium text-gray-500 hover:text-gray-900">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </nav>
      </div>
    </header>
  );
};
