const CONFIG = {
  defaultTitle: "Nemo's blog",
  url:
    process.env.NODE_ENV !== "development"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000/",
  defaultDescription:
    "I'm Nemo. I enjoy exploring new technology and tools that help me to get more productive. I also write articles about the web development path that I found in my daily life.",
};

export default CONFIG;
