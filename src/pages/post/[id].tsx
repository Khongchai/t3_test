import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { Head } from "next/document";
import { api } from "~/utils/api";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <main className="flex h-screen justify-center">
        <div>Post View</div>
      </main>
    </>
  );
};

export default SinglePostPage;
