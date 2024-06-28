import { data } from '@/data/how-to/insex';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = data;

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function DeployToGithubIO({ params }: Props) {
  const { slug } = params;
  const post = data.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="p-8 text-center">No data found</div>
    );
  }

  const { title, content } = post;

  return (
    <article>
      <header className="flex justify-between items-center">
        <h1>{title}</h1>

        <Link href="/how-to">
          <button className="px-4 py-2 border border-transparent hover:border-sky-600 rounded-full whitespace-nowrap">
            &lt;- Back
          </button>
        </Link>
      </header>

      {content}
    </article>
  );
}
 