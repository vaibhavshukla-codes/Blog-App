import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 shadow-sm border-b sticky top-0 z-20 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/logo.png" alt="Blog Logo" width={40} height={40} className="rounded-xl shadow border border-blue-200 dark:border-gray-700" />
          </Link>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Blog App</span>
        </div>
        <div className="flex items-center gap-6 text-base font-medium">
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <Link href="/admin" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Admin</Link>
          <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-colors">Create Post</Link>
        </div>
      </div>
    </nav>
  );
} 