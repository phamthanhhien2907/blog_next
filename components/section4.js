// D:\Jobs\nextjs_blog_app\components\section4.js
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/author";
import Spinner from "./_child/spinner";

export default function Section4({ popular }) {
  if (!popular || popular.length === 0) return <Spinner />;

  const businessPosts = popular
    .filter((post) => post.category.includes("Business"))
    .slice(0, 3);
  const travelPosts = popular
    .filter((post) => post.category.includes("Travel"))
    .slice(0, 3);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Business</h1>
          <div className="flex flex-col gap-6">
            {businessPosts.map((post, index) => (
              <Post data={post} key={index} />
            ))}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {travelPosts.map((post, index) => (
              <Post data={post} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, author } = data;

  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/posts/${id}`}>
          <a>
            <Image
              src={img || "/"}
              className="rounded"
              width={300}
              height={250}
              alt={title || "Post Image"}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "No Category"}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-800 hover:text-gray-600">
              - {published || ""}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title || "No Title"}
            </a>
          </Link>
        </div>
        {author ? <Author {...author} /> : <></>}
      </div>
    </div>
  );
}
