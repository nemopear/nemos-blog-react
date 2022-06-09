import Link from "next/link";
import React from "react";

const CardTeaser = ({ post }) => {
  // const { title, thumbnail, slug, categories } = post;
  return (
    <Link href={`/posts/${post.slug}`}>
      <a>
        <div
          key={post.title}
          className="col-span-1 rounded-md border border-gray-300 p-5"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p>{post.excerpt}</p>
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
