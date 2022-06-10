import BadgeCategory from "@components/ui/BadgeCategory";
import { Badge } from "@mantine/core";
import moment from "moment";
import Link from "next/link";
import React from "react";

const CardTeaser = ({ post }) => {
  console.log(post);

  // const { title, thumbnail, slug, categories } = post;
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <div
          key={post.title}
          className="col-span-1 rounded-md border border-gray-300 p-5 prose prose-base"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="">{post.excerpt}</p>
          <div className="flex justify-between items-center mt-1">
            <small className="create-at text-sm text-gray-500">
              {moment(post.createdAt).format("MMM Do, YYYY")}
            </small>

            <BadgeCategory
              label={post.categories[0].name}
              bgColor={post.categories[0].color.css}
            />
          </div>
          {/* <div
              className="m-0"
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            /> */}
        </div>
        {/* Post: {JSON.stringify(post)} */}
      </a>
    </Link>
  );
};

export default CardTeaser;
