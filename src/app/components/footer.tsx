import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            StyleHub
          </Link>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} StyleHub. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/about" className="transition-colors hover:text-gray-600">
            About
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-gray-600"
          >
            Contact
          </Link>
          <Link href="/terms" className="transition-colors hover:text-gray-600">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-gray-600"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
