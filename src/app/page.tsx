import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 mb-8 flex-grow backdrop-blur-3xl">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-8xl font-bold mb-4">Sink</h1>
        <h2 className="text-3xl font-bold mb-24">
          A video synchronization application
        </h2>
        <Button variant="primary" loading>Primary</Button>
      </div>
      <footer className="flex flex-col items-center justify-center w-full h-24 flex-shrink-0">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center mt-8"
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="h-4 ml-2"
            width={72}
            height={16}
            style={{ filter: "invert(1)" }}
          />
        </a>
      </footer>
    </main>
  );
}
