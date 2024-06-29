import MainMenu from '@/components/main-layout/MainMenu';

export default function Header() {
  return (
    <header className="bg-sky-400 text-white">
      <div className="container mx-auto flex items-center justify-between px-8 py-6">
        <div className="text-lg">Nick Burdo</div>
        <MainMenu />
      </div>
    </header>
  );
}
