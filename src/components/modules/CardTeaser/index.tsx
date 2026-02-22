import { memo } from "react";
import { Card, CardContent, CardActionArea, Chip, Typography, Box } from "@mui/material";
import moment from "moment";
import Link from "next/link";

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

interface CardTeaserProps {
  post: Post;
}

const CardTeaser: React.FC<CardTeaserProps> = ({ post }) => {
  const category = post.categories?.[0];

  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
          borderColor: "divider",
          transition: "box-shadow 0.2s, transform 0.2s",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardActionArea sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <CardContent sx={{ flexGrow: 1, width: "100%" }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mb: 2,
              }}
            >
              {post.excerpt}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "auto",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {moment(post.createdAt).format("MMM Do, YYYY")}
              </Typography>
              {category ? (
                <Chip
                  label={category.name}
                  size="small"
                  sx={{
                    bgcolor: category.color?.css || "#e0e0e0",
                    color: "#fff",
                    fontSize: "0.75rem",
                    height: 24,
                  }}
                />
              ) : null}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

const CardTeaserMemo = memo(CardTeaser, (prevProps, nextProps) => {
  return (
    prevProps.post.slug === nextProps.post.slug &&
    prevProps.post.title === nextProps.post.title &&
    prevProps.post.excerpt === nextProps.post.excerpt &&
    prevProps.post.createdAt === nextProps.post.createdAt
  );
});

CardTeaserMemo.displayName = "CardTeaser";

export default CardTeaserMemo;
