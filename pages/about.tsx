import { BasicLayout } from "@components/ui/Layout";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import CONFIG from "src/data/config";
import { graphCms } from "src/lib/graphCms";

const AboutPage = ({ pages }) => {
  return (
    <>
      <Head>
        <title>Nemo's Blog | About me</title>
        <meta property="og:title" content="Nemo's Blog | About me" />
        <meta property="og:description" content={CONFIG.defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${CONFIG.url}about}`} />
        <meta
          property="og:image"
          content="https://media.graphassets.com/output=format:jpg/resize=width:350,height:350,fit:crop/FWUnmkz9Ruqwt34qsNZ7"
        />
      </Head>
      <BasicLayout>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  mx: "auto",
                  mb: 3,
                }}
              >
                {pages[0]?.thumbnail?.url && (
                  <img
                    src={pages[0].thumbnail.url}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                className="content prose"
                sx={{
                  mx: "auto",
                  my: 4,
                  "& h2": { fontSize: "1.5rem", fontWeight: 600, mt: 3, mb: 2 },
                  "& p": { lineHeight: 1.8, mb: 2 },
                }}
                dangerouslySetInnerHTML={{ __html: pages[0]?.content?.html || "" }}
              />
            </Grid>
          </Grid>
        </Container>
      </BasicLayout>
    </>
  );
};

export default AboutPage;

export async function getStaticProps() {
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
      fallback: false,
    },
    revalidate: 10,
  };
}
