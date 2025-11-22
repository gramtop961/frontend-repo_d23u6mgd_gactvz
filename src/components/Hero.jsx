import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[320px] md:h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/D17NpA0ni2BTjUzp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full pl-64 flex items-center">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_25px_rgba(0,255,106,0.4)]">AI-Powered Plant Protection</h2>
          <p className="mt-3 max-w-xl text-gray-300">Detect diseases, get treatments, and shop recommended products — all in one cyberpunk-styled dashboard.</p>
          <div className="mt-6 flex gap-3">
            <a href="#quick-scan" className="px-5 py-2.5 rounded-xl bg-[#00ff6a] text-black font-semibold shadow-[0_0_25px_#00ff6a]">Quick Scan</a>
            <a href="/scan" className="px-5 py-2.5 rounded-xl ring-1 ring-[#00ff6a]/40 text-[#00ff6a] hover:bg-[#00ff6a]/10 transition">Full Analyzer</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
    </section>
  )
}
