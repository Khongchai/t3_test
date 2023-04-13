import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import "dayjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import LoadingIndicator from "~/components/loading";
import { PageLayout } from "~/components/pageLayout";
import PostView from "~/components/postView";
import { api } from "~/utils/api";
dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const [input, setInput] = useState("");

  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.getAll.invalidate();
    },
    onError: (error) => {
      alert(error.data?.httpStatus);
    },
  });
  if (!user) return null;

  function onMutate() {
    mutate({ content: input });
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (input) {
        mutate({ content: input });
      }
    }
  }

  return (
    <div className="flex w-full items-center gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={onInputChange}
        disabled={isPosting}
        onKeyDown={onKeyDown}
      />
      <button
        className="relative h-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={onMutate}
        disabled={isPosting}
      >
        {isPosting ? (
          <LoadingIndicator variant="s" full={false} />
        ) : (
          <span>Post</span>
        )}
      </button>
    </div>
  );
};

const Feed = () => {
  const { data: posts, isLoading: isPostLoading } = api.posts.getAll.useQuery();

  if (isPostLoading && !posts) return <LoadingIndicator variant="m" full />;
  if (!posts) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {posts &&
        posts.map((props) => <PostView {...props} key={props.post.id} />)}
    </div>
  );
};

const Home: NextPage = () => {
  // Prefetch
  api.posts.getAll.useQuery();

  const user = useUser();

  if (!user.isLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          {!user.isSignedIn ? (
            <SignInButton mode="modal" />
          ) : (
            <CreatePostWizard />
          )}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
