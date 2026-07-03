import ConnectWallet from "@/components/ConnectWallet";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-bold">
        Pamoja Protocol
      </h1>

      <ConnectWallet />
    </main>
  );
}