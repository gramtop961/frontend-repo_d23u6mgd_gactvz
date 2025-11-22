import { User, SunMoon } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-black/60 backdrop-blur border-b border-emerald-500/20">
      <div className="pl-64">{/* sidebar width offset */}
        <div className="h-16 flex items-center justify-between px-6">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#e5e5e5]">
            Plant AI Guardian
          </h1>
          <div className="flex items-center gap-3">
            <button className="h-10 w-10 grid place-items-center rounded-xl bg-[#00ff6a]/10 ring-1 ring-[#00ff6a]/30 text-[#00ff6a]">
              <SunMoon className="w-5 h-5" />
            </button>
            <div className="h-10 w-10 grid place-items-center rounded-xl bg-gray-800 text-gray-200">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
