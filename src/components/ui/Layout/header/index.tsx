import {
  AppBar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Logo } from "@components/logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { graphCms } from "src/lib/graphCms";
import Fuse from "fuse.js";
import { useThemeMode } from "src/context/ThemeContext";

interface Category {
  name: string;
  color: {
    css: string;
  };
}

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  categories: Category[];
}

export const Header: React.FC = () => {
  const theme = useTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [categories, setCategories] = useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const getCategory = async () => {
      const { categories } = await graphCms.request(`
            query MyQuery {
                categories {
                color {
                    css
                }
                name
                }
            }          
            `);
      setCategories(categories);
    };
    const getAllPosts = async () => {
      const { posts } = await graphCms.request(`
        {
          posts {
            title
            slug
            excerpt
            categories {
              name
              color {
                css
              }
            }
          }
        }
      `);
      setAllPosts(posts);
    };
    getCategory();
    getAllPosts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() && allPosts.length > 0) {
      const fuse = new Fuse(allPosts, {
        keys: ["title", "excerpt"],
        threshold: 0.3,
      });
      const results = fuse.search(searchQuery);
      setSearchResults(results.map((r) => r.item).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allPosts]);

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo hasImage />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isMobile && (
            <Button
              startIcon={<SearchIcon />}
              onClick={() => setSearchOpen(true)}
              sx={{
                color: "text.secondary",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                px: 2,
                py: 0.5,
                textTransform: "none",
              }}
            >
              <Typography variant="body2" sx={{ mr: 4 }}>
                Search...
              </Typography>
              <Chip label="⌘K" size="small" variant="outlined" />
            </Button>
          )}

          {isMobile && (
            <IconButton onClick={() => setSearchOpen(true)} aria-label="Search">
              <SearchIcon />
            </IconButton>
          )}

          <Button
            onClick={handleCategoryClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ color: "text.primary" }}
          >
            Categories
          </Button>

          <Link href="/about" legacyBehavior>
            <MuiLink
              underline="none"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "text.primary" },
              }}
            >
              About
            </MuiLink>
          </Link>

          <IconButton onClick={toggleTheme} aria-label="Toggle dark mode" sx={{ color: "text.primary" }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCategoryClose}
        MenuListProps={{
          "aria-labelledby": "category-button",
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category.name} onClick={handleCategoryClose}>
            <Link
              href={`/categories/${category.name.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit", width: "100%" }}
            >
              <Chip
                label={category.name}
                size="small"
                sx={{
                  bgcolor: category.color?.css || "#e0e0e0",
                  color: "#fff",
                  fontWeight: 500,
                }}
              />
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchOpen(false)} aria-label="Close search">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: "12px 12px 0 0" },
            }}
          />
          {searchResults.length > 0 ? (
            <Box sx={{ p: 2 }}>
              {searchResults.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => setSearchOpen(false)}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.excerpt}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};
