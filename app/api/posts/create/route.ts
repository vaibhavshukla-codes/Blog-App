import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate SEO-friendly slug from title
    let slug = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    // Check if slug already exists and make it unique
    let counter = 1;
    let originalSlug = slug;
    while (await Post.findOne({ slug })) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    // Sanitize HTML content to prevent XSS
    const sanitizedContent = purify.sanitize(content);

    const post = new Post({
      title: title.trim(),
      content: sanitizedContent,
      slug,
    });

    await post.save();

    return NextResponse.json(
      { 
        success: true, 
        post: {
          id: post._id,
          title: post.title,
          slug: post.slug,
          createdAt: post.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 