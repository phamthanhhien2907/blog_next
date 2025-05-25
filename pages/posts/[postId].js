import Format from "../../layout/format";
import Author from "../../components/_child/author";
import Image from "next/image";
import Ralated from "../../components/_child/ralated";
import Spinner from "../../components/_child/spinner";
import ErrorComponent from "../../components/_child/error";
import { useRouter } from "next/router";
import useFetcher from "../../lib/fetcher";

export default function Page() {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading, isError } = useFetcher(
    postId ? `api/posts/${postId}` : null
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorComponent />;
  if (!data) return <Spinner />;

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {data.author ? <Author {...data.author} /> : <></>}
        </div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {data.title || "No Title"}
          </h1>
          <p className="text-gray-500 text-xl text-center">
            {data.subtitle || "No Subtitle"}
          </p>
          <div className="py-10">
            <Image
              src={data.img || "/"}
              width={900}
              height={600}
              alt={data.title || "Post Image"}
            />
          </div>
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {data.description || "No Description"}
          </div>
        </div>
        <Ralated />
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  const mockPosts = [
    {
      id: 1,
      title: "Post 1",
      subtitle: "Subtitle 1",
      img: "/projects/post1.png",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Post 2",
      subtitle: "Subtitle 2",
      img: "/projects/post2.png",
      description: "Description 2",
    },
  ];

  const post = mockPosts.find((p) => p.id === parseInt(params.postId)) || {};

  return {
    props: {
      fallback: {
        "/api/posts": post,
      },
    },
  };
}

export async function getStaticPaths() {
  const mockPosts = [
    {
      id: 1,
      title: "Post 1",
      subtitle: "Subtitle 1",
      img: "/projects/post1.png",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Post 2",
      subtitle: "Subtitle 2",
      img: "/projects/post2.png",
      description: "Description 2",
    },
  ];

  const paths = mockPosts.map((value) => ({
    params: {
      postId: value.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
