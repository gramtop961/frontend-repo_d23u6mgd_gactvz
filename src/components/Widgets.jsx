import { motion } from 'framer-motion'

export function StatCard({ title, value, glow }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className={`rounded-2xl p-5 bg-[#0a0a0a] ring-1 ring-emerald-500/20 ${glow ? 'shadow-[0_0_25px_#00ff6a33]' : ''}`}>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </motion.div>
  )
}

export function QuickScan({ onAnalyze }) {
  return (
    <div id="quick-scan" className="rounded-2xl p-6 bg-[#0a0a0a] ring-1 ring-emerald-500/20 shadow-[0_0_25px_#00ff6a22]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-300">Quick Scan</div>
          <div className="text-sm text-gray-500">Upload a plant image to analyze instantly</div>
        </div>
        <button onClick={onAnalyze} className="px-4 py-2 rounded-xl bg-[#00ff6a] text-black font-semibold shadow-[0_0_25px_#00ff6a]">Analyze Image</button>
      </div>
    </div>
  )
}
