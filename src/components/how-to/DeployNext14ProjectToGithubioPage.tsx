export default function DeployNext14ProjectToGithubioPage() {
  return (
    <div>
      <ol className="list-decimal my-4 pl-8">
        <li className="px-2 py-1">
          <p>Prepare you local Next.js project to SSG.</p>
          <p>To do this, add the <code>output: &#34;export&#34;</code> option to the <code>next.config.mjs</code> file.</p>
          <p>Now after running next build, Next.js will generate an out folder containing static assets for your
            app.</p>
          <blockquote>
            Don&apos;t forget to check the application for DEV, BUILD and START
          </blockquote>
        </li>
        <li className="px-2 py-1">If you don&apos;t already have a personal github.io page,
          create <code>your_account.github.io</code> repository.
        </li>
        <li className="px-2 py-1">Add this repository as remote origin to git in you local Next.js project.</li>
        <li className="px-2 py-1">Push your local project to <code>your_account.github.io</code> repository.</li>
        <li className="px-2 py-1">In the repository top menu click <strong>Actions</strong>.</li>
        <li className="px-2 py-1">If you already have workflows, click <strong>New workflow</strong> button.</li>
        <li className="px-2 py-1">On the <strong>Chose a workflow</strong> page type &ldquo;next&rdquo; in the search
          input
          and press <strong>Enter</strong>.
        </li>
        <li className="px-2 py-1">In the card with title &ldquo;Next.js&rdquo; and small Next.js logo
          click <strong>Configure</strong> button.
        </li>
        <li className="px-2 py-1">On top right click <strong>Commit changes...</strong> button.</li>
        <li className="px-2 py-1">Goto <strong>Actions</strong> page and check workflow run.</li>
        <li className="px-2 py-1">Check out your project on <code>https://your_account.github.io/</code>.</li>
      </ol>
      <p className="mt-8 text-sm">Thanks Mateush &#64;msokola for the &nbsp;
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://hackernoon.com/you-should-publish-your-nextjs-app-to-github-pages"
        >
          You Should Publish Your Next.js App to GitHub Pages
        </a>
      </p>
    </div>
  );
}
