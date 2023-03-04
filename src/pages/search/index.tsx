import React from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import Image from "next/image";

const getPosts = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
};

const SearchPage: React.FC = () => {
  const params = useSearchParams();
  const searchQuery = params ? params.get("q") : null;
  const encodedQueryParams = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR<{ posts: Array<Post & { author: User }> }>(
    `/api/search?q=${encodedQueryParams}`,
    getPosts
  );

  if (isLoading) {
    return (
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (!data?.posts) null;

  if (data?.posts.length === 0) return <div>No results found</div>;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
      {data?.posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-row space-y-4 gap-4 p-4 border-4 border-slate-500 rounded-xl shadow-md"
        >
          <div className="flex flex-col justify-center items-center">
            <Image
              src={post.author.imageUrl || ""}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span
              className="text-xl font-semibold
              text-blue-200
            "
            >
              {post.author.name}
            </span>
            <span className="text-lg font-light">{post.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
