import { BasicLayout } from "@components/";
import CardTeaser from "@components/modules/CardTeaser";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { graphCms } from "src/lib/graphCms";

const CategoriesList = ({ posts }: { posts: any[] }) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Head>
        <title>Nemo's Blog | {name}</title>
      </Head>
      <BasicLayout>
        <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 2, lg: 8 } }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, textTransform: "capitalize" }}
          >
            {name}
          </Typography>
          <Grid container spacing={3}>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.slug}>
                  <CardTeaser post={post} />
                </Grid>
              ))
            ) : (
              <Box sx={{ py: 8, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found in this category.
                </Typography>
              </Box>
            )}
          </Grid>
        </Container>
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

  const paths = posts.categories.map(({ name }: { name: string }) => ({
    params: {
      name,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { name: string } }) {
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
      fallback: false,
    },
  };
}
