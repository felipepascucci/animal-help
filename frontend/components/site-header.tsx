import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <div className="flex items-center h-14 px-4 border-b bg-background">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          Patas do Bem
        </Link>
    </div>
  )
}

