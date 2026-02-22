import { Box, Container, Divider, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { Logo } from "@components/logo";

export const Footer: React.FC = () => {
  return (
    <>
      <Box component="footer" sx={{ mt: 4, py: 3 }}>
        <Divider />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Logo />
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component="a"
                href="https://github.com/nemopear"
                target="_blank"
                aria-label="GitHub"
                size="large"
              >
                <IoLogoGithub size={24} />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/nemopear"
                target="_blank"
                aria-label="Twitter"
                size="large"
              >
                <IoLogoTwitter size={24} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/nutchaya-vorayingyong-69682543/"
                target="_blank"
                aria-label="LinkedIn"
                size="large"
              >
                <IoLogoLinkedin size={24} />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            © {new Date().getFullYear()} Nemo's Blog. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};
