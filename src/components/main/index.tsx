import BadgeCategory from "@components/ui/BadgeCategory";
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
      <div className="py-10 text-center font-light ">
        <div className="container mx-auto">
          <h1 data-test="main-heading" className="mb-4 text-4xl font-medium">
            Learn something new everyday
          </h1>
          <p className="mb-8 text-lg">เรียนรู้ และบันทึกไว้ 📒✏️</p>
          <div className="mx-auto inline-block">
            <ul className="flex flex-wrap items-center justify-center">
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
