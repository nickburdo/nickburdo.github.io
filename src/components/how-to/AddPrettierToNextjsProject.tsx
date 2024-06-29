export default function AddPrettierToNextjsProject() {
  return (
    <div>
      <ol className="my-4 list-decimal pl-8">
        <li className="px-2 py-1">
          Install prettier dependencies:
          <pre>
            npm i -D prettier eslint-plugin-prettier eslint-config-prettier
            prettier-plugin-tailwindcss
          </pre>
        </li>

        <li className="px-2 py-1">
          Add prettier config file: <code>.prettierrc.json</code>
          {/* prettier-ignore */}
          <pre>{
            `{ 
  "singleQuote": true, 
  "trailingComma": "all", 
  "semi": true, 
  "bracketSpacing": true, 
  "tabWidth": 2, 
  "printWidth": 100, 
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
}`
          }</pre>
        </li>

        <li className="px-2 py-1">
          Update <code>.eslintrc.json</code> file as following:
          {/* prettier-ignore */}
          <pre>{
            `{
  "extends": [
    "next/core-web-vitals",
    "plugin:prettier/recommended"
  ]
}`
          }</pre>
        </li>

        <li className="px-2 py-1">
          Open the <code>package.json</code> file and modify scripts like the below:
          {/* prettier-ignore */}
          <pre>{
            `"scripts": {
  ...
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}`
          }</pre>
        </li>

        <li className="px-2 py-1">
          Install Husky and lint-staged which adds a git hook to run linting while committing:
          {/* prettier-ignore */}
          <pre>npx mrm lint-staged</pre>
        </li>
      </ol>

      <h3>UPD</h3>
      <p>
        To avoid a Github action error during build execution, change the <code>prepare</code>{' '}
        command in your <code>package.json</code> file:
      </p>
      <pre>{`"scripts": {
  ...
  "prepare": "husky install || true"}`}</pre>

      <p className="mt-8 text-sm">
        Thanks Ismail Demirbilek for the &nbsp;
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://dbtek.medium.com/add-code-formatting-with-prettier-to-next-js-project-b53c93ffdf91"
        >
          Add Code Formatting with Prettier to Next.js Project
        </a>
      </p>

      <p className="text-sm">
        Thanks inapeace0 for the &nbsp;
        <a
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@rifantechguy55/setting-up-a-next-js-13-project-with-eslint-and-prettier-735c3ccfd26c"
        >
          Setting Up a Next.js 13 Project with ESLint and Prettier
        </a>
      </p>
    </div>
  );
}
