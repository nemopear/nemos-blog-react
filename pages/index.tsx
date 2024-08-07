import { Main } from "@components/main";
import CardTeaser from "@components/modules/CardTeaser";
import { BasicLayout } from "@components/ui/Layout";
import Head from "next/head";
import React from "react";
import CONFIG from "src/data/config";
import { graphCms } from "src/lib/graphCms";

const Home: React.FC = ({ posts, pages }) => {
  return (
    <>
      {/* <NextSeo
        title={CONFIG.defaultTitle}
        description={CONFIG.defaultDescription}
        openGraph={{
          url: `${CONFIG.url}`,
          title: `${CONFIG.defaultTitle}`,
          description: `${CONFIG.defaultDescription}`,
          images: [
            {
              url: "https://media.graphassets.com/output=format:jpg/resize=width:350,height:350,fit:crop/FWUnmkz9Ruqwt34qsNZ7",
              width: 400,
              height: 400,
              alt: `${CONFIG.defaultTitle}`,
              type: "image/jpeg",
            },
          ],
          site_name: `${CONFIG.defaultTitle}`,
        }}
      /> */}

      <Head>
        <title>Nemo's Blog</title>
        <meta property="og:title" content={CONFIG.defaultTitle} />
        <meta property="og:description" content={CONFIG.defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CONFIG.url} />
        <meta
          property="og:image"
          content="https://media.graphassets.com/output=format:jpg/resize=width:350,height:350,fit:crop/FWUnmkz9Ruqwt34qsNZ7"
        />
      </Head>
      <BasicLayout>
        <Main />
        <div className="flex-1lg:my-8 container mx-auto max-w-screen-lg">
          <div className="grid grid-cols-1 gap-6 md:auto-rows-[1fr] md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <CardTeaser key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* <Divider className="my-8" />
        <Grid>
          <Grid.Col sm={4}>
            <div className="mx-auto aspect-square h-[120px] w-[120px] overflow-hidden rounded-full sm:ml-auto sm:mr-0">
              <img
                src={pages[0].thumbnail.url}
                className="aspect-square object-cover"
                width={500}
                height={500}
              />
            </div>
          </Grid.Col>
          <Grid.Col sm={6}>
            <div
              className="content prose my-2 sm:my-0 lg:prose-base"
              dangerouslySetInnerHTML={{ __html: pages[0].content.html }}
            ></div>
          </Grid.Col>
        </Grid> */}
      </BasicLayout>
    </>
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
            posts(orderBy: createdAt_DESC) {
              createdAt
              excerpt 
              title
              slug
              pin
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

  const { pages } = await graphCms.request(`
        {
          pages(where: { title_contains: "about"}) {
            id
            thumbnail{
              url
            }
            content{
              html
            }
          }
        }
        `);
  return {
    props: {
      posts,
      pages,
      fallback: false,
    },
    revalidate: 10,
  };
}
