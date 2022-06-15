import { BasicLayout } from "@components/ui/Layout";
import { Grid } from "@mantine/core";
import Head from "next/head";
import Image from "next/image";
import { graphCms } from "src/lib/graphCms";

const AboutPage = ({ pages }) => {
  return (
    <>
      <Head>
        <title>Nemo's Blog | About me</title>
      </Head>
      <BasicLayout>
        <div className="mt-10 lg:mt-20 lg:max-w-xl xl:max-w-2xl">
          {/* <h1 className="mb-4 text-4xl font-medium">Hi friend</h1> */}
          {/* about: {JSON.stringify(pages[0].thumbnail)} */}
          <Grid>
            <Grid.Col>
              <div className="mx-auto aspect-square h-[120px] w-[120px] overflow-hidden rounded-full">
                <Image
                  src={pages[0].thumbnail.url}
                  className="aspect-square object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </Grid.Col>
            <Grid.Col>
              <div
                className="content prose my-8 mx-auto lg:prose-base"
                dangerouslySetInnerHTML={{ __html: pages[0].content.html }}
              ></div>
            </Grid.Col>
          </Grid>
        </div>
      </BasicLayout>
    </>
  );
};

export default AboutPage;
export async function getStaticProps() {
  // const req = await fetch('https://jsonplaceholder.typicode.com/todos/');
  // const data = await req.json();
  // return {
  //     props: {data}
  // }
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
      pages,
    },
    revalidate: 10,
  };
}
