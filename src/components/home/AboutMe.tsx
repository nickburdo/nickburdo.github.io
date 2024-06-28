export default function AboutMe() {
  return (
    <article className="px-48">
      <div className="flex items-center justify-between gap-x-10 mb-8">
        <div>
          <h1>Hello!</h1>
          <h2>My name is Nick.</h2>
          <h3 className="mb-4">I&apos;m a JavaScript full stack web developer for over 10 years.</h3>
        </div>
        <div className="w-64">
          <img className="w-full rounded-full" src="/burdo-960.jpg" alt="My image"/>
        </div>
      </div>

      <div className=" text-justify">
        <p className="p">At first I did the layout. <strong>HTML</strong>, <strong>CSS</strong>, the struggle for
          semantics, pixel perfect and all that.</p>

        <p className="p">Then I worked with CMS - <strong>WordPress</strong>, <strong>Mob-X</strong>. There were the
          basics of <strong>PHP</strong> and <strong>MySQL</strong> database.</p>

        <p className="p">Then <strong>Ajax</strong> and <strong>jQuery</strong> gained popularity. Web pages have
          become increasingly dynamic. There is more and more <strong>JavaScript</strong> in web pages.</p>

        <p className="p">And then <strong>React.js</strong> appeared. And the website began to be called an
          <em>application</em>.</p>

        <p className="p">Then I met <strong>Angular-2+</strong> - this is a real framework with its own rules and
          a lot of work &ldquo;under the hood&rdquo;. And where there is <strong>Angular</strong>, there is
          <strong>TypeScript</strong>.</p>

        <p className="p">Next up was <strong>Vue.js</strong>. I really liked him. And with the advent of version 3
          and the <strong>Composition API</strong>, I simply fell in love with it.</p>

        <p className="p">The ever-increasing demands of CEOs required new solutions - <strong>SSR</strong> and <strong>SSG</strong>.
          And frameworks such as <strong>Next.js</strong> (based
          on React.js) and <strong>Nuxt.js</strong> (based on Vue.js) appeared. So now the work of a web developer
          is increasingly shifting from simple front-end to <strong>full-stack</strong>.</p>

        <p className="p">Development on <strong>Node.js</strong> did not pass me by either. So I know how to work
          with <strong>Express</strong>, <strong>Nest.js</strong>, <strong>Prisma</strong>, <strong>PostgreSQL</strong>, <strong>MongoDB</strong>.</p>

        <p className="p">And of course, I know how to work with <strong>Git</strong>, <strong>Docker</strong> and <strong>CI/CD</strong>.</p>

        <p className="text-xl text-sky-800 my-6">Now I work for a wonderful company called <strong>Altamira</strong>.
          There is a friendly
          team of professionals and a wide variety of projects - larger and smaller, but all very interesting.</p>
      </div>
    </article>
  );
}

