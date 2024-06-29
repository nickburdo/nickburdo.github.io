import { data } from '@/data/how-to';
import Link from 'next/link';

export default function HowTo() {
  const posts = data;

  return (
    <>
      <h1>How to&hellip;</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="link" href={`/how-to/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
