import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex gap-6">
      <Link href="/">Dashboard</Link>
      <Link href="/task">Task</Link>
      <Link href="/context">Context</Link>
    </nav>
  );
}
