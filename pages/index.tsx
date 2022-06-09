import { Main } from "@components/main";
import CardTeaser from "@components/modules/CardTeaser";
import { BasicLayout } from "@components/ui/Layout";
import React from "react";
import { graphCms } from "src/lib/graphCms";

const Home: React.FC = ({ posts }) => {
  console.log("posts ", posts);

  return (
    <BasicLayout>
      <Main />
      <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <CardTeaser key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </BasicLayout>
  );
};

export default Home;

export async function getStaticProps() {
  // const req = await fetch('https://jsonplaceholder.typicode.com/todos/');
  // const data = await req.json();
  // return {
  //     props: {data}
  // }
  const { posts } = await graphCms.request(`
        {
            posts {
              excerpt 
              title
              slug
              thumbnail {
                url
              }
              categories{
                name
                color{
                  css
                }
              }
              
              content{
                html
                text 
              }
            }
        }
        `);

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
