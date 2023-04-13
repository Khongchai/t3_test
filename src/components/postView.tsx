import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Link from "next/link";
import Image from "next/image";
import { RouterOutputs } from "~/utils/api";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      className="flex items-center gap-2 border-b border-slate-400 p-8"
      key={post.id}
    >
      <Image
        src={author.profileImageUrl}
        alt="Profile image"
        className="h-8 w-8 rounded-full"
        width={32}
        height={32}
      />
      <div className="flex flex-col items-start font-bold text-slate-400">
        <span>
          <Link href={`/@${author.username}`}>@{author.username}</Link>
          <span className="font-thin">
            {" · "}
            <Link href={`/post/${post.id}`}>
              {dayjs(post.createdAt).fromNow()}
            </Link>
          </span>
        </span>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostView;
