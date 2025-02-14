import Link from "next/link"


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Altverse</h1>
      <Link 
        href="/dapp" 
        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        Get started
      </Link>
    </main>
  )
}
