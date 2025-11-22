import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Scanner() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [treatments, setTreatments] = useState([])
  const [products, setProducts] = useState([])
  const [tutorials, setTutorials] = useState([])
  const inputRef = useRef(null)

  const onSelect = async (f) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const analyze = async () => {
    if (!file) return
    setLoading(true)
    try {
      const b64 = await toBase64(file)
      const res = await fetch(`${API_BASE}/api/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: b64 }) })
      const data = await res.json()
      setResult(data.result)
      setTreatments(data.treatments || [])
      setProducts(data.products || [])
      setTutorials(data.tutorials || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const dropHandlers = {
    onDragOver: (e) => { e.preventDefault(); },
    onDrop: (e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) onSelect(f) },
  }

  return (
    <div className="space-y-6">
      <div {...dropHandlers} className="rounded-2xl border-2 border-dashed border-[#00ff6a]/40 bg-black/60 p-6 text-center cursor-pointer hover:border-[#00ff6a] transition"
        onClick={() => inputRef.current?.click()}>
        {preview ? (
          <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-xl" />
        ) : (
          <div className="py-10 text-gray-300 flex flex-col items-center gap-3">
            <UploadCloud className="w-10 h-10 text-[#00ff6a]" />
            <div>Drag & drop or click to upload (JPG/PNG)</div>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onSelect(e.target.files?.[0])} />
      </div>

      <div className="flex gap-3">
        <button disabled={!file || loading} onClick={analyze} className="px-5 py-2.5 rounded-xl bg-[#00ff6a] text-black font-semibold shadow-[0_0_25px_#00ff6a] disabled:opacity-50">
          {loading ? <div className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</div> : 'Analyze Image'}
        </button>
        <button onClick={() => { setFile(null); setPreview(''); setResult(null); setTreatments([]); setProducts([]); setTutorials([]); }} className="px-5 py-2.5 rounded-xl ring-1 ring-[#00ff6a]/40 text-[#00ff6a]">Reset</button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20 shadow-[0_0_25px_#00ff6a22]">
              <div className="text-gray-400">Detected Disease</div>
              <div className="mt-1 text-2xl font-semibold text-white">{result.disease}</div>
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-1">Confidence</div>
                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="h-full bg-[#00ff6a]" style={{ width: `${Math.round((result.confidence || 0)*100)}%` }} />
                </div>
                <div className="mt-1 text-xs text-gray-400">{Math.round((result.confidence || 0)*100)}%</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300">
                <div className="rounded-lg bg-black/60 p-3 ring-1 ring-emerald-500/20">Organ: <span className="text-white">{result.organ || 'leaf'}</span></div>
                <div className="rounded-lg bg-black/60 p-3 ring-1 ring-emerald-500/20">Severity: <span className="text-white capitalize">{result.severity || 'medium'}</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
                <details className="group">
                  <summary className="cursor-pointer text-white">More Info</summary>
                  <p className="mt-2 text-gray-400 text-sm">AI-generated insights about the disease, conditions, and spread patterns. Replace with your API details.</p>
                </details>
              </div>

              <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
                <div className="text-white mb-2">Treatments</div>
                <div className="space-y-3">
                  {treatments.map((t, i) => (
                    <details key={i} className="group rounded-xl p-3 bg-black/60 ring-1 ring-emerald-500/20">
                      <summary className="cursor-pointer text-[#00ff6a]">Option {i+1}</summary>
                      <div className="mt-2 text-sm text-gray-300 space-y-1">
                        {t.symptoms && <p><span className="text-gray-500">Symptoms: </span>{t.symptoms}</p>}
                        {t.organic && <p><span className="text-gray-500">Organic: </span>{t.organic}</p>}
                        {t.chemical && <p><span className="text-gray-500">Chemical: </span>{t.chemical}</p>}
                        {t.prevention && <p><span className="text-gray-500">Prevention: </span>{t.prevention}</p>}
                        <button onClick={() => navigator.clipboard.writeText(`${t.organic || ''}\n${t.chemical || ''}\n${t.prevention || ''}`)} className="mt-2 text-xs px-2 py-1 rounded-lg bg-[#00ff6a] text-black font-semibold">Copy</button>
                      </div>
                    </details>
                  ))}
                  {treatments.length === 0 && <div className="text-gray-500 text-sm">No treatments available.</div>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
            <div className="text-white mb-3">Recommended Products</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((p, i) => (
                <a key={i} href={p.url || '#'} target="_blank" className="group rounded-xl overflow-hidden ring-1 ring-emerald-500/30 hover:ring-[#00ff6a] transition shadow-[0_0_20px_#00ff6a22]">
                  {p.image && <img src={p.image} alt={p.name} className="h-28 w-full object-cover" />}
                  <div className="p-3">
                    <div className="text-[#00ff6a] group-hover:underline">{p.name}</div>
                    {p.price != null && <div className="text-gray-400 text-sm">${p.price.toFixed(2)}</div>}
                    <div className="mt-2 inline-block text-xs px-2 py-1 rounded bg-[#00ff6a] text-black font-semibold">Buy</div>
                  </div>
                </a>
              ))}
              {products.length === 0 && <div className="text-gray-500 text-sm">No products found.</div>}
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20">
            <div className="text-white mb-3">Tutorials</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tutorials.map((v, i) => (
                <VideoCard key={i} item={v} />
              ))}
              {tutorials.length === 0 && <div className="text-gray-500 text-sm">No tutorials found.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-emerald-500/30 hover:ring-[#00ff6a] transition">
      {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="h-28 w-full object-cover" />}
      <div className="p-3">
        <div className="text-[#00ff6a] line-clamp-2 min-h-[40px]">{item.title}</div>
        <button onClick={() => setOpen(true)} className="mt-2 text-xs px-2 py-1 rounded bg-[#00ff6a] text-black font-semibold">View</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur grid place-items-center">
            <div className="w-full max-w-3xl aspect-video bg-black ring-1 ring-emerald-500/40 rounded-xl overflow-hidden">
              <div className="flex justify-end p-2">
                <button onClick={() => setOpen(false)} className="text-[#00ff6a]">Close</button>
              </div>
              {item.videoId ? (
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${item.videoId}`} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              ) : (
                <div className="p-6 text-gray-300">No video available</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
