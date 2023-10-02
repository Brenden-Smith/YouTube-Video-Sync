import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  const roomId = Math.random().toString(36).substring(2, 10);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 mb-8 flex-grow backdrop-blur-3xl">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-8xl font-bold mb-4">Sink</h1>
        <h2 className="text-3xl font-bold mb-24">
          A video synchronization application
        </h2>
        <Link href={`/room/${roomId}`}>
          <Button>Create Room</Button>
        </Link>
      </div>
      <footer className="flex items-center justify-center w-full h-24 flex-shrink-0">
        <p>
          Created by{" "}
          <a href="https://brenden-smith.com" className="text-blue-500">
            Brenden Smith
          </a>
        </p>
      </footer>
    </main>
  );
}
