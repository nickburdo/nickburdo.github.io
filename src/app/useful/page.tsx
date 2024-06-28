import { links } from '@/data/useful';

export default function Useful() {
  return (
    <>
      <h1>Useful Links</h1>

      <ul>
        {links.map(({ id, title, href}) => (
          <li key={id} className="mb-2">
            <a
              className="link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              { title }
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
