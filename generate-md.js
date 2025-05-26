// D:\Jobs\nextjs_blog_app\generate-md.js
const fs = require("fs");
const path = require("path");

// Construct the absolute path to data.js
const dataPath = path.join(__dirname, "pages", "api", "data.js");

let data;
try {
  data = require(dataPath);
} catch (error) {
  console.error("Error loading data.js:", error.message);
  process.exit(1);
}

if (!data || !data.Posts || !data.Trending || !data.Popular) {
  console.error(
    "Error: data.js does not contain Posts, Trending, or Popular arrays"
  );
  process.exit(1);
}

const generateMarkdown = (item, type, id) => {
  const frontmatter = `---
title: "${item.title}"
subtitle: "${item.subtitle}"
category: "${item.category}"
img: "${item.img}"
published: "${item.published}"
author:
  name: "${item.author.name.trim()}"
  img: "${item.author.img}"
  designation: "${item.author.designation}"
---
${item.description.trim()}
`;
  const outputDir = path.join(__dirname, "content", "posts");
  fs.mkdirSync(outputDir, { recursive: true }); // Create content/posts if it doesn't exist
  fs.writeFileSync(path.join(outputDir, `${type}-${id}.md`), frontmatter);
};

data.Posts.forEach((post) => generateMarkdown(post, "post", post.id));
data.Trending.forEach((trending) =>
  generateMarkdown(trending, "trending", trending.id)
);
data.Popular.forEach((popular) =>
  generateMarkdown(popular, "popular", popular.id)
);

console.log("Markdown files generated successfully in content/posts");
