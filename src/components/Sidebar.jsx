import { Home, ScanLine, Stethoscope, ShoppingCart, PlayCircle, Leaf } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const navItem = (
    to,
    label,
    Icon
  ) => (
    <NavLink
      to={to}
      className={({ isActive }) => `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
        isActive ? 'bg-[#00ff6a]/10 text-[#00ff6a]' : 'text-gray-300 hover:text-[#00ff6a] hover:bg-[#00ff6a]/5'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  )

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-emerald-500/20 bg-black/80 backdrop-blur-md p-4">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-[#00ff6a]/10 ring-1 ring-[#00ff6a]/30">
          <Leaf className="text-[#00ff6a]" />
        </div>
        <div className="text-gray-200">
          <div className="text-sm">Plant AI</div>
          <div className="text-lg font-semibold text-[#00ff6a]">Guardian</div>
        </div>
      </div>

      <nav className="mt-4 space-y-1">
        {navItem('/', 'Dashboard', Home)}
        {navItem('/scan', 'Scan Plant', ScanLine)}
        {navItem('/treatments', 'Treatments', Stethoscope)}
        {navItem('/products', 'Products', ShoppingCart)}
        {navItem('/tutorials', 'Tutorials', PlayCircle)}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500">
        Dark mode is default. Toggle coming soon.
      </div>
    </aside>
  )
}
