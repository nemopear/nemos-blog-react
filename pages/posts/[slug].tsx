import { BasicLayout } from "@components/ui/Layout";
import Giscus from "@giscus/react";
import moment from "moment";
import Head from "next/head";
import { graphCms } from "src/lib/graphCms";

const singlePost: React.FC = ({ post }) => {
  // const { title, createdAt, content } = post;
  return (
    <>
      <Head>
        <title>Nemo's Blog | {post.title}</title>
      </Head>
      <BasicLayout>
        <div className="lg:max-w-xl xl:max-w-2xl mt-10 lg:mt-20">
          <h1 className="text-4xl font-medium mb-4">{post.title}</h1>
          <div className="create-at text-sm text-gray-500 my-4">
            {moment(post.createdAt).format("MMM Do, YYYY")}
          </div>
          <div
            className="content prose lg:prose-base my-8 lg:my-16"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          >
            {/* {post.content.html} */}
          </div>
          <Giscus
            id="comments"
            repo="nemopear/nemos-blogs-react"
            repoId="R_kgDOHd-iKw"
            category="General"
            categoryId="DIC_kwDOHd-iK84CPk7v"
            mapping="title"
            term="Welcome to Nemo's Blog !"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
          />
        </div>
      </BasicLayout>
    </>
  );
};

export default singlePost;

export async function getStaticPaths() {
  const { posts } = await graphCms.request(`
        {
            posts {
                slug
            }
        }
    `);
  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { post } = await graphCms.request(
    `
        query SinglePost($slug: String!) {
            post(where: {slug: $slug}) {
                title
                createdAt
                content {
                    html
                    
                }
            }
        }      
    `,
    { slug: params.slug }
  );

  return {
    props: {
      post,
      revalidate: 10,
    },
  };
}
