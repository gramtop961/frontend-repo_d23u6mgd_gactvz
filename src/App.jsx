import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import { DashboardPage, ScanPage, TreatmentsPage, ProductsPage, TutorialsPage } from './components/Pages'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-[#e5e5e5]">
      <Sidebar />
      <Topbar />
      <Hero />
      <main className="pl-64 px-6 pb-10 -mt-20 relative z-10">
        {children}
      </main>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/treatments" element={<TreatmentsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
