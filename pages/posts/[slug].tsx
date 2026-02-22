import { BasicLayout } from "@components/ui/Layout";
import {
  Box,
  Container,
  Typography,
  Divider,
  LinearProgress,
  Chip,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import moment from "moment";
import Head from "next/head";
import { graphCms } from "src/lib/graphCms";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useThemeMode } from "src/context/ThemeContext";
import CardTeaser from "@components/modules/CardTeaser";
import { lightTheme, darkTheme } from "src/theme/colors";

const Giscus = dynamic(() => import("@giscus/react"), { ssr: false });

interface Heading {
  id: string;
  text: string;
  level: number;
}

const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const parseHeadings = (html: string): Heading[] => {
  const headings: Heading[] = [];
  const regex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-3]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      id: match[2],
      text: match[3],
      level: parseInt(match[1]),
    });
  }
  return headings;
};

const singlePost: React.FC<{ post: any; relatedPosts: any[] }> = ({
  post,
  relatedPosts,
}) => {
  const theme = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const { mode } = useThemeMode();
  const [giscusTheme, setGiscusTheme] = useState("light");

  const isDark = mode === "dark";
  const themeColors = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    setGiscusTheme(mode === "dark" ? "dark_dimmed" : "light");
  }, [mode]);

  const readingTime = calculateReadingTime(post.content.text || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const extractedHeadings = parseHeadings(post.content.html);
    setHeadings(extractedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    extractedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [post.content.html]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  return (
    <>
      <Head>
        <title>Nemo's Blog | {post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
      </Head>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <LinearProgress variant="determinate" value={scrollProgress} />
      </Box>

      <BasicLayout maxWidth="lg">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {headings.length > 0 && (
              <Grid
                item
                xs={12}
                md={3}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    top: 100,
                    maxHeight: "calc(100vh - 120px)",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    On this page
                  </Typography>
                  {headings.map((heading) => (
                    <Link
                      key={heading.id}
                      href={`#${heading.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          py: 0.5,
                          pl: heading.level === 3 ? 2 : 0,
                          color:
                            activeHeading === heading.id
                              ? "primary.main"
                              : "text.secondary",
                          fontWeight:
                            activeHeading === heading.id ? 600 : 400,
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {heading.text}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={9}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <IconButton size="small" sx={{ mb: 2 }}>
                  <ArrowBackIcon />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    Back to posts
                  </Typography>
                </IconButton>
              </Link>

              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight={600}
              >
                {post.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {moment(post.createdAt).format("MMM Do, YYYY")}
                </Typography>
                <Chip
                  label={`${readingTime} min read`}
                  size="small"
                  variant="outlined"
                />
                <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          shareTitle
                        )}&url=${encodeURIComponent(shareUrl)}`,
                        "_blank"
                      )
                    }
                  >
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          shareUrl
                        )}&title=${encodeURIComponent(shareTitle)}`,
                        "_blank"
                      )
                    }
                  >
                    <LinkedInIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box
                className="content prose"
                sx={{
                  color: themeColors.body.color,
                  "& h1": {
                    fontSize: "2rem",
                    fontWeight: 700,
                    mt: 4,
                    mb: 3,
                    color: themeColors.heading.color,
                  },
                  "& h2": {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mt: 4,
                    mb: 2,
                    color: themeColors.heading.color,
                  },
                  "& h3": {
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: themeColors.heading.color,
                  },
                  "& h4": {
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: themeColors.heading.color,
                  },
                  "& h5": {
                    fontSize: "1rem",
                    fontWeight: 600,
                    mt: 2,
                    mb: 1,
                    color: themeColors.heading.color,
                  },
                  "& h6": {
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    mt: 2,
                    mb: 1,
                    color: themeColors.heading.color,
                  },
                  "& p": {
                    lineHeight: 1.8,
                    mb: 2,
                  },
                  "& code": {
                    bgcolor: themeColors.code.bg,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    color: themeColors.code.text,
                  },
                  "& pre": {
                    bgcolor: themeColors.code.bg,
                    p: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    "& code": {
                      bgcolor: "transparent",
                      p: 0,
                    },
                  },
                  "& img": {
                    maxWidth: "100%",
                    borderRadius: 2,
                  },
                  "& a": {
                    color: themeColors.link.color,
                    textDecoration: "underline",
                  },
                  "& ul, & ol": {
                    pl: 3,
                    mb: 2,
                  },
                  "& li": {
                    mb: 1,
                  },
                  "& blockquote": {
                    borderLeft: `4px solid ${themeColors.blockquote.border}`,
                    pl: 2,
                    ml: 0,
                    fontStyle: "italic",
                    color: themeColors.blockquote.text,
                  },
                  "& strong, & b": {
                    fontWeight: 700,
                    color: themeColors.heading.color,
                  },
                  "& em, & i": {
                    fontStyle: "italic",
                    color: themeColors.text.secondary,
                  },
                  "& table": {
                    width: "100%",
                    borderCollapse: "collapse",
                    mb: 2,
                  },
                  "& th, & td": {
                    border: `1px solid ${themeColors.divider}`,
                    px: 2,
                    py: 1,
                    textAlign: "left",
                  },
                  "& th": {
                    bgcolor: isDark ? "#2d2d30" : "#f5f5f5",
                    fontWeight: 600,
                    color: themeColors.heading.color,
                  },
                  "& td": {
                    color: themeColors.body.color,
                  },
                  "& hr": {
                    border: "none",
                    borderTop: `1px solid ${themeColors.divider}`,
                    my: 3,
                  },
                  "& ul, & ol": {
                    pl: 3,
                    mb: 2,
                  },
                  "& li": {
                    mb: 1,
                    color: themeColors.body.color,
                  },
                  "& input, & textarea, & select": {
                    bgcolor: isDark ? "#2d2d30" : "#ffffff",
                    color: themeColors.body.color,
                    border: `1px solid ${themeColors.divider}`,
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                  },
                  "& mark": {
                    bgcolor: isDark ? "#4da3ff" : "#ffeb3b",
                    color: isDark ? "#000000" : "#000000",
                    px: 0.5,
                    borderRadius: 1,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: post.content.html }}
              />

              <Divider sx={{ my: 4 }} />

              <Giscus
                id="comments"
                repo="nemopear/nemos-blog-react"
                repoId="R_kgDOHd-iKw"
                category="General"
                categoryId="DIC_kwDOHd-iK84CPk7v"
                mapping="title"
                term="Welcome to Nemo's Blog!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={giscusTheme}
                lang="en"
              />
            </Grid>
          </Grid>

          {relatedPosts.length > 0 ? (
            <Box sx={{ mt: 8 }}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={600}
                sx={{ mb: 3 }}
              >
                Related Posts
              </Typography>
              <Grid container spacing={3}>
                {relatedPosts.map((relatedPost) => (
                  <Grid item xs={12} sm={6} md={4} key={relatedPost.slug}>
                    <CardTeaser post={relatedPost} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : null}
        </Container>
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
  const paths = posts.map(({ slug }: { slug: string }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { post } = await graphCms.request(
    `
        query SinglePost($slug: String!) {
            post(where: {slug: $slug}) {
                slug
                title
                thumbnail {
                  url
                }
                createdAt
                content {
                    html
                    text
                }
                excerpt
                categories {
                  name
                  color {
                    css
                  }
                }
            }
        }      
    `,
    { slug: params.slug }
  );

  const { posts: allPosts } = await graphCms.request(`
    {
      posts {
        slug
        title
        excerpt
        createdAt
        categories {
          name
          color {
            css
          }
        }
      }
    }
  `);

  const relatedPosts = allPosts
    .filter(
      (p: any) =>
        p.slug !== params.slug &&
        p.categories?.some((c: any) =>
          post.categories?.some((pc: any) => pc.name === c.name)
        )
    )
    .slice(0, 3);

  return {
    props: {
      post,
      relatedPosts,
      revalidate: 10,
      fallback: false,
    },
  };
}
