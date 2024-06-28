import MainMenu from '@/components/main-layout/MainMenu';

export default function Header() {
  return (
    <header className="bg-sky-400 text-white">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="text-lg">Nick Burdo</div>
        <MainMenu />
      </div>
    </header>
  );
}
