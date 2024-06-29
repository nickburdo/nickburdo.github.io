import { posts } from '@/data/how-to';
import Link from 'next/link';

export default function HowTo() {
  return (
    <>
      <h1>How to&hellip;</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link className="link" href={`/how-to/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
