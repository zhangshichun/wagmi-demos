import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <p>Hi guys, here are the demos:</p>
      <ol>
        <li>
          <Link href="/01-wallet-connect">wallet-connect</Link>
        </li>
        <li>
          <Link href="/02-reading-chains-and-blocks">
            reading-chains-and-blocks
          </Link>
        </li>
        <li>
          <Link href="/03-batch-create-accounts">
            batch-create-accounts
          </Link>
        </li>
        <li>
          <Link href="/04-fortune-draw">fortune-draw</Link>
        </li>
      </ol>
    </main>
  );
}
