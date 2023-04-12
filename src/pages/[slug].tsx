import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import { Head } from "next/document";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  return (
    <>
      <main className="flex h-screen justify-center">
        <div>Profile View</div>
      </main>
    </>
  );
};

export default ProfilePage;
