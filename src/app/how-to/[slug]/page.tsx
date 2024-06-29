import { data } from '@/data/how-to';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = data;

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function DeployToGithubIO({ params }: Props) {
  const { slug } = params;
  const post = data.find((p) => p.slug === slug);

  if (!post) {
    return <div className="p-8 text-center">No data found</div>;
  }

  const { title, content } = post;

  return (
    <article>
      <header className="flex items-center justify-between">
        <h1>{title}</h1>

        <Link href="/how-to">
          <button className="whitespace-nowrap rounded-full border border-transparent px-4 py-2 hover:border-sky-600">
            &lt;- Back
          </button>
        </Link>
      </header>

      {content}
    </article>
  );
}
