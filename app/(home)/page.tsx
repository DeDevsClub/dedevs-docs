export const metadata = {
  title: 'DeDevs | Docs',
};

export default function HomePage() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center text-center"
    >
      {/* <Image
        src="/hero.png"
        width={2400}
        height={1800}
        alt="DeDevs Hero"
        className={`
          mb-4 rounded-lg shadow-lg
          w-full h-full object-cover
        `}
      /> */}
      <p className="text-sm">Read the <a href="/docs" className="underline">/docs</a></p>
    </main>
  );
}
