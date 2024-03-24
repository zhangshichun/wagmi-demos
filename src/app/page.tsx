import { Button } from "antd";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <p>Hi, guys, here is the demos:</p>
      <p>
        <Link href="/01-wallet-connect">01、wallet-connect</Link>
      </p>
    </main>
  );
}
