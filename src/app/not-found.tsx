export default function NotFound() {
  return (
    <div className="fixed inset-0 mt-[88px] flex flex-col items-center justify-center gap-96 bg-[url('/404.png')] bg-cover bg-[right_-50rem_center] bg-no-repeat text-3xl font-bold text-white sm:bg-[right_-25rem_center]">
      <div className="text-9xl">404</div>
      <div>This is not the page you are looking for</div>
    </div>
  );
}
