import Link from 'next/link';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts/${slug}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} - Blog App`,
    description: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    keywords: post.title.split(' ').join(', '),
    authors: [{ name: 'Blog App Team' }],
    openGraph: {
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Blog
            </Link>
            <Link 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <time dateTime={post.createdAt}>
                Published on {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
              </time>
              {post.updatedAt !== post.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <time dateTime={post.updatedAt}>
                    Updated on {format(new Date(post.updatedAt), 'MMMM dd, yyyy')}
                  </time>
                </>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div 
              className="blog-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="p-8 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to All Posts
              </Link>
              <div className="text-sm text-gray-500">
                Share this post:
                <div className="flex space-x-2 mt-2">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Facebook
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Blog App. Built with Next.js and MongoDB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 