import { BasicLayout } from "@components/";
import CardTeaser from "@components/modules/CardTeaser";
import { Main } from "next/document";
import Head from "next/head";
import { useRouter } from "next/router";
import { graphCms } from "src/lib/graphCms";

const CategoriesList = ({ posts }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Head>
        <title>Nemo's Blog | {name}</title>
      </Head>
      <BasicLayout>
        {/* {JSON.stringify(posts)} */}
        <div className="flex-1 container my-2 lg:my-8 max-w-screen-lg mx-auto p-5">
          <h1 className="mb-4 capitalize">{name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <CardTeaser key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default CategoriesList;
export async function getStaticPaths() {
  const posts = await graphCms.request(`
      {
        categories {
          name
        } 
      }     
    `);
  // const categories = category?.name;
  console.log("postCategory", posts);

  const paths = posts.categories.map(({ name }) => ({
    params: {
      name,
    },
  }));
  // const paths = ({ id }) => ({
  //   params: {
  //     name: ["react"],
  //   },
  // });
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const { posts } = await graphCms.request(
    `query Posts($name: String!) {
  posts(where: {categories_every: {name: $name}}) {
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
                text 
              }

  }
}

    `,
    { name: params.name }
  );

  return {
    props: {
      posts,
      revalidate: 10,
    },
  };
}
