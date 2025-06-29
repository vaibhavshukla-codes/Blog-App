import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

function getExcerpt(html: string, maxLength = 120) {
  // Handle undefined or null content
  if (!html) return '';
  
  // Remove HTML tags and trim
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    const data = await res.json();
    return data.posts || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight drop-shadow-sm">Welcome to Blog App</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">A modern, minimal blogging platform built with Next.js and MongoDB. Share your thoughts, ideas, and stories with the world!</p>
          <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-lg shadow transition-colors">Create Your First Post</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/default-blog.jpg" alt="Blog Hero" width={400} height={300} className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover" />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">Latest Posts</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Discover our latest articles and insights</p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 animate-fade-in max-w-xl mx-auto">
            <Image src="/default-blog.jpg" alt="Default Blog" width={320} height={180} className="mb-6 rounded-xl shadow object-cover" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Welcome to Your Blog!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg text-center">No posts yet. Start by creating your first blog post and share your story with the world.</p>
            <Link href="/admin/create" className="btn px-8 py-3 text-lg">Create Your First Post</Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post, idx) => (
              <article key={post._id} className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                <div className="relative">
                  <Image src="/cover.jpg" alt="Blog cover" width={600} height={260} className="w-full h-48 object-cover rounded-t-2xl" />
                  <span className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md backdrop-blur">General</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    <Link href={`/post/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-3">{getExcerpt(post.content)}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center font-bold text-blue-700 dark:text-gray-200 border border-blue-200 dark:border-gray-700 shadow">A</span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">Admin</span>
                    </div>
                    <time dateTime={post.createdAt} className="text-sm">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</time>
                  </div>
                  <Link href={`/post/${post.slug}`} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-base mt-auto group">
                    Read more
                    <svg className="ml-2 w-5 h-5 inline-block align-middle group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 dark:bg-gray-900/60 border-t mt-12 py-8 text-center text-gray-500 dark:text-gray-400 text-base rounded-t-2xl shadow-inner">
        &copy; 2024 Blog App. Built with Next.js and MongoDB.
      </footer>
    </div>
  );
} 