// D:\Jobs\nextjs_blog_app\pages\posts\[postId].js
import Image from "next/image";
import Format from "../../layout/format";
import Author from "../../components/_child/author";
import Ralated from "../../components/_child/ralated";
import Spinner from "../../components/_child/spinner";

export default function Page({ post, posts }) {
  if (!post) return <Spinner />;

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {post.author ? <Author {...post.author} /> : <></>}
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {post.title || "No Title"}
          </h1>
          <p className="text-gray-500 text-xl text-center">
            {post.subtitle || "No Subtitle"}
          </p>
          <div className="py-10">
            <Image
              src={post.img || "/"}
              width={900}
              height={600}
              alt={post.title || "Post Image"}
            />
          </div>
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {post.description || "No Description"}
          </div>
        </div>
        <Ralated posts={posts} />
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  const fs = require("fs");
  const path = require("path");
  const matter = require("gray-matter");

  const postsDir = path.join(process.cwd(), "content", "posts");
  let post = null;
  let posts = [];

  try {
    // Read individual post
    const filePath = path.join(postsDir, `post-${params.postId}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    post = {
      ...frontmatter,
      id: parseInt(params.postId),
      description: content,
    };

    // Read all posts for Ralated component
    const files = fs.readdirSync(postsDir);
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
  } catch (error) {
    console.error(
      `Error reading markdown files for post-${params.postId}:`,
      error.message
    );
  }

  return {
    props: {
      post,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const fs = require("fs");
  const path = require("path");

  const postsDir = path.join(process.cwd(), "content", "posts");
  let paths = [];

  try {
    const files = fs.readdirSync(postsDir);
    paths = files
      .filter((file) => file.startsWith("post-") && file.endsWith(".md"))
      .map((file) => ({
        params: {
          postId: file.replace("post-", "").replace(".md", ""),
        },
      }));
  } catch (error) {
    console.error(
      "Error reading post markdown files for paths:",
      error.message
    );
  }

  return {
    paths,
    fallback: false,
  };
}
