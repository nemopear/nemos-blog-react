import BadgeCategory from "@components/ui/BadgeCategory";
import { Badge } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { graphCms } from "src/lib/graphCms";

export const Main: React.FC = () => {
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
    <>
      <div className="text-center font-light py-10 ">
        <div className="container mx-auto">
          <h1 data-test="main-heading" className="font-medium text-4xl mb-4">
            Learn something new everyday
          </h1>
          <p className="text-lg mb-8">เรียนรู้ และบันทึกไว้ 📒✏️</p>
          <div className="inline-block mx-auto">
            <ul className="flex flex-wrap items-center justify-center">
              {/* {console.log("categoryLinks : ", categoryLinks)} */}
              {categoryLinks.map((link) => (
                <li key={link.name} className="m-1">
                  <Link href={`/categories/${link.name}`}>
                    <a>
                      <BadgeCategory
                        bgColor={link.color.css}
                        label={link.name}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* {posts.map((post) => (
        <CardTeaser key={post.slug} post={post} />
      ))} */}
    </>
  );
};
