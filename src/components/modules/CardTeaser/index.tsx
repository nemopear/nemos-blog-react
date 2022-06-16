import BadgeCategory from "@components/ui/BadgeCategory";
import moment from "moment";
import Link from "next/link";
import React from "react";

const CardTeaser = ({ post }) => {
  // const { title, thumbnail, slug, categories } = post;
  return (
    <Link href={`/posts/${post.slug}`}>
      <a className="relative h-full">
        {/* {post.pin && (
          <div className="absolute right-5 top-2.5 text-xl text-yellow-300">
            <BsFillStarFill />
          </div>
        )} */}
        <div
          key={post.title}
          className="prose prose-sm col-span-1 mx-auto flex h-full flex-col rounded-md border border-gray-300 p-5"
        >
          <h2 className="!text-md mb-2 font-semibold">{post.title}</h2>
          <p className="line-clamp-none sm:line-clamp-8">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between">
            <small className="create-at text-sm text-gray-500">
              {moment(post.createdAt).format("MMM Do, YYYY")}
            </small>

            <BadgeCategory
              label={post.categories[0].name}
              bgColor={post.categories[0].color.css}
              className="!text-xs"
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
