import { NextPage } from "next";
import { Head } from "next/document";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main className="flex h-screen justify-center">
        <div>Post View</div>
      </main>
    </>
  );
};

export default SinglePostPage;
