import { BasicLayout } from "@components/ui/Layout";
import moment from "moment";
import { graphCms } from "src/lib/graphCms";

const singlePost: React.FC = ({ post }) => {
  // const { title, createdAt, content } = post;
  return (
    <BasicLayout>
      <div className="lg:max-w-xl xl:max-w-2xl mt-20">
        <h1 className="text-4xl font-medium mb-4">{post.title}</h1>
        <div className="create-at text-sm text-gray-500 my-4">
          {moment(post.createdAt).format("MMM Do, YYYY")}
        </div>
        <div
          className="content prose lg:prose-base leading-7 prose-red-h2 my-16"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        >
          {/* {post.content.html} */}
        </div>
      </div>
    </BasicLayout>
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
