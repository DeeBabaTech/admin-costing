import prisma from "@/lib/prisma";
import Link from "next/link";
import { logout } from "./auth/actions";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <main className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Blog Posts</h1>
      <ul className='space-y-4 mb-5'>
        {posts.map((post) => (
          <li key={post.id} className='border p-4 rounded'>
            <a href={`/posts/${post.id}`} className='text-xl font-semibold'>
              {post.title}
            </a>
            <p className='text-sm text-gray-600'>
              by {post.author?.name || "Unknown"} on {post.id}
            </p>
            <p className='mt-2'>{post.content?.slice(0, 200)}…</p>
          </li>
        ))}
      </ul>

      <Link href='/add-post'>
        <button className='px-2 py-1 bg-gray-500 mr-5'>Add Post </button>
      </Link>
      <button onClick={logout} className='px-2 py-1 bg-gray-500'>
        Log out
      </button>
    </main>
  );
}
