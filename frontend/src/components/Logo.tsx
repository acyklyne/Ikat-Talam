import React from "react"
import Image from "next/image"
import { cn } from "../lib/utils"

export const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <Image
        src="/images/logo.png"
        alt="Ikat Talam Logo"
        width={100}
        height={40}
        className={cn("h-12 w-12 object-contain ")}
        priority
      />
      <span className="text-xl font-headline font-bold text-[#733015] tracking-wide">
        Ikat Talam
      </span>
    </div>
  )
}