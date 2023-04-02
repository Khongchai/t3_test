import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoading, data: posts } = api.posts.getAll.useQuery();

  const user = useUser();

  if (isLoading) return <div>...is loading</div>;

  if (!posts) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 border-x-white md:max-w-2xl ">
          <div className="border-b border-slate-400 p-4">
            {!user.isSignedIn ? (
              <SignInButton mode="modal" />
            ) : (
              <SignOutButton />
            )}
          </div>
          <div className="flex flex-col">
            {posts &&
              posts.map((post) => (
                <div className="border-b border-slate-400 p-8" key={post.id}>
                  {post.content}
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
