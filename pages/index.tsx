import { Main } from "@components/main";
import CardTeaser from "@components/modules/CardTeaser";
import { BasicLayout } from "@components/ui/Layout";
import { Box, Container, Grid, Typography, Chip } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import CONFIG from "src/data/config";
import { graphCms } from "src/lib/graphCms";
import PushPinIcon from "@mui/icons-material/PushPin";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  thumbnail?: { url: string };
  categories: Array<{
    name: string;
    color: { css: string };
  }>;
  pin?: boolean;
}

const Home: React.FC<{ posts: Post[]; pinnedPosts: Post[] }> = ({
  posts,
  pinnedPosts,
}) => {
  const regularPosts = posts.filter((post) => !post.pin);

  return (
    <>
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

        {pinnedPosts.length > 0 ? (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <PushPinIcon color="warning" />
              <Typography variant="h5" component="h2" fontWeight={600}>
                Featured Posts
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {pinnedPosts.map((post) => (
                <Grid item xs={12} md={6} key={post.slug}>
                  <CardTeaser post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        <Box sx={{ flexGrow: 1, my: 4 }}>
          <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 3 }}>
            Latest Posts
          </Typography>
          <Grid container spacing={3}>
            {regularPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.slug}>
                <CardTeaser post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </BasicLayout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const postsQuery = graphCms.request(`
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

  const pagesQuery = graphCms.request(`
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

  const [{ posts }, { pages }] = await Promise.all([postsQuery, pagesQuery]);

  const pinnedPosts = posts.filter((post: Post) => post.pin);

  return {
    props: {
      posts,
      pinnedPosts,
      pages,
      fallback: false,
    },
    revalidate: 10,
  };
}
