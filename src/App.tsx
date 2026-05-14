import FileExplorer from './components/FileExplorer'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 selection:bg-blue-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            File Explorer
          </h1>
        </div>
        
        <FileExplorer />
      </div>
    </div>
  )
}

export default App
