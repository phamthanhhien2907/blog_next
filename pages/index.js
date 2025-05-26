// D:\Jobs\nextjs_blog_app\pages\index.js
import Head from "next/head";
import Format from "../layout/format";
import Section1 from "../components/section1";
import Section2 from "../components/section2";
import Section3 from "../components/section3";
import Section4 from "../components/section4";

export default function Home({ trending, posts, popular }) {
  return (
    <Format>
      <Section1 trending={trending} />
      <Section2 posts={posts} />
      <Section3 popular={popular} />
      <Section4 popular={popular} />
    </Format>
  );
}

export async function getStaticProps() {
  const fs = require("fs");
  const path = require("path");
  const matter = require("gray-matter");

  const postsDir = path.join(process.cwd(), "content", "posts");
  let trending = [];
  let posts = [];
  let popular = [];

  try {
    const files = fs.readdirSync(postsDir);

    // Read trending posts
    trending = files
      .filter((file) => file.startsWith("trending-") && file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data: frontmatter, content } = matter(fileContent);
        return {
          ...frontmatter,
          id: parseInt(file.replace("trending-", "").replace(".md", "")),
          description: content,
        };
      });

    // Read posts
    posts = files
      .filter((file) => file.startsWith("post-") && file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data: frontmatter, content } = matter(fileContent);
        return {
          ...frontmatter,
          id: parseInt(file.replace("post-", "").replace(".md", "")),
          description: content,
        };
      });

    // Read popular posts
    popular = files
      .filter((file) => file.startsWith("popular-") && file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data: frontmatter, content } = matter(fileContent);
        return {
          ...frontmatter,
          id: parseInt(file.replace("popular-", "").replace(".md", "")),
          description: content,
        };
      });
  } catch (error) {
    console.error("Error reading markdown files:", error.message);
  }

  return {
    props: {
      trending,
      posts,
      popular,
    },
  };
}
