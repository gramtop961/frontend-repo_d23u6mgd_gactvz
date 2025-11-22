import { useEffect, useState } from 'react'
import Scanner from './Scanner'
import { StatCard, QuickScan } from './Widgets'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export function DashboardPage() {
  const [recent, setRecent] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/recent`).then(r => r.json()).then(setRecent).catch(() => {})
  }, [])

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Scans" value={String(200 + recent.length)} glow />
        <StatCard title="Common Disease" value={(recent[0]?.disease) || 'Leaf Blight'} />
        <StatCard title="Avg Confidence" value={`${Math.round((recent[0]?.confidence || 0.82)*100)}%`} />
        <StatCard title="Active Alerts" value="3" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickScan onAnalyze={() => (window.location.href = '/scan')} />

          <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
            <div className="text-white mb-3">Recently Analyzed</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recent.map((r, i) => (
                <div key={i} className="rounded-xl p-3 bg-black/60 ring-1 ring-emerald-500/20">
                  <div className="text-[#00ff6a]">{r.disease}</div>
                  <div className="text-gray-400 text-sm">{Math.round((r.confidence || 0)*100)}% • {r.severity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
            <div className="text-white mb-3">Helpful Tutorials</div>
            <div className="space-y-2 text-sm text-gray-300">
              <a className="block hover:underline text-[#00ff6a]" href="/tutorials">Treating leaf blight effectively</a>
              <a className="block hover:underline text-[#00ff6a]" href="/tutorials">Preventing powdery mildew</a>
              <a className="block hover:underline text-[#00ff6a]" href="/tutorials">Soil care basics</a>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
            <div className="text-white mb-3">Most Common Diseases</div>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between"><span>Leaf Blight</span><span>42%</span></div>
              <div className="flex justify-between"><span>Powdery Mildew</span><span>28%</span></div>
              <div className="flex justify-between"><span>Rust</span><span>15%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ScanPage() {
  return (
    <div>
      <Scanner />
    </div>
  )
}

export function TreatmentsPage() {
  const [query, setQuery] = useState('Leaf Blight')
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/treatments?disease=${encodeURIComponent(query)}`).then(r=>r.json()).then(setItems).catch(()=>{}) }, [query])
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 rounded-xl bg-black/60 ring-1 ring-emerald-500/30 px-3 py-2 text-gray-200 placeholder-gray-500" placeholder="Search disease..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button className="px-4 rounded-xl bg-[#00ff6a] text-black font-semibold">Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t, i) => (
          <div key={i} className="rounded-2xl p-5 bg-[#0a0a0a] ring-1 ring-emerald-500/20 shadow-[0_0_25px_#00ff6a22]">
            {t.symptoms && <p className="text-sm text-gray-400">{t.symptoms}</p>}
            {t.organic && <p className="mt-2 text-gray-200"><span className="text-[#00ff6a]">Organic:</span> {t.organic}</p>}
            {t.chemical && <p className="text-gray-200"><span className="text-[#00ff6a]">Chemical:</span> {t.chemical}</p>}
            {t.prevention && <p className="text-gray-200"><span className="text-[#00ff6a]">Prevention:</span> {t.prevention}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductsPage() {
  const [query, setQuery] = useState('Leaf Blight')
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/products?disease=${encodeURIComponent(query)}`).then(r=>r.json()).then(setItems).catch(()=>{}) }, [query])
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 rounded-xl bg-black/60 ring-1 ring-emerald-500/30 px-3 py-2 text-gray-200 placeholder-gray-500" placeholder="Search disease..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button className="px-4 rounded-xl bg-[#00ff6a] text-black font-semibold">Search</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p, i) => (
          <a key={i} href={p.url || '#'} target="_blank" className="group rounded-2xl overflow-hidden ring-1 ring-emerald-500/30 hover:ring-[#00ff6a] transition shadow-[0_0_20px_#00ff6a22]">
            {p.image && <img src={p.image} alt={p.name} className="h-36 w-full object-cover" />}
            <div className="p-4">
              <div className="text-[#00ff6a] group-hover:underline">{p.name}</div>
              {p.price != null && <div className="text-gray-400 text-sm">${Number(p.price).toFixed(2)}</div>}
              <div className="mt-2 inline-block text-xs px-2 py-1 rounded bg-[#00ff6a] text-black font-semibold">Buy</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export function TutorialsPage() {
  const [query, setQuery] = useState('Leaf Blight')
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/tutorials?disease=${encodeURIComponent(query)}`).then(r=>r.json()).then(setItems).catch(()=>{}) }, [query])
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 rounded-xl bg-black/60 ring-1 ring-emerald-500/30 px-3 py-2 text-gray-200 placeholder-gray-500" placeholder="Search disease..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button className="px-4 rounded-xl bg-[#00ff6a] text-black font-semibold">Search</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((v, i) => (
          <div key={i} className="rounded-2xl overflow-hidden ring-1 ring-emerald-500/30 hover:ring-[#00ff6a] transition">
            {v.thumbnail && <img src={v.thumbnail} alt={v.title} className="h-36 w-full object-cover" />}
            <div className="p-4">
              <div className="text-[#00ff6a]">{v.title}</div>
              <a className="mt-2 inline-block text-xs px-2 py-1 rounded bg-[#00ff6a] text-black font-semibold" href={v.url || (v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : '#')} target="_blank">View</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
