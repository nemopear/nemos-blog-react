import { Logo } from "@components/logo";
import { Container } from "@mantine/core";
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
    <Container size="lg" className="w-full">
      <header className="relative z-20">
        <div className="py-4">
          <nav
            className="relative flex items-center justify-between sm:h-10"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Logo hasImage />
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
    </Container>
  );
};
