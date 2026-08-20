import { useState } from 'react'
import './App.css'
import { SummaryCards } from './components/SummaryCards'
import { StrideChart } from './components/StrideChart'
import { SessionsTable } from './components/SessionsTable'
import { ReferencePanel } from './components/ReferencePanel'
import { StakeholderOverview } from './components/StakeholderOverview'
import { SystemDetailPanel } from './components/SystemDetailPanel'
import {
  products,
  strideFindings,
  guidingPrinciples,
  strideReference,
  systemDetails,
  type ProductThreatModel,
} from './data/threatModelData'

type ViewMode = 'stakeholder' | 'detailed'

function App() {
  const [view, setView] = useState<ViewMode>('stakeholder')
  const [selected, setSelected] = useState<ProductThreatModel | null>(null)

  return (
    <>
      <header className="dashboard-header">
        <h1>Threat Modeling Program Dashboard</h1>
        <p>
          Tracks threat modeling coverage, STRIDE findings, and remediation status
          across First Advantage systems. Sample data — connect to live ADO work
          items for production use.
        </p>
        <div className="view-toggle">
          <button
            type="button"
            className={view === 'stakeholder' ? 'view-toggle-btn active' : 'view-toggle-btn'}
            onClick={() => setView('stakeholder')}
          >
            Stakeholder Overview
          </button>
          <button
            type="button"
            className={view === 'detailed' ? 'view-toggle-btn active' : 'view-toggle-btn'}
            onClick={() => setView('detailed')}
          >
            Detailed View
          </button>
        </div>
      </header>

      {view === 'stakeholder' ? (
        <StakeholderOverview products={products} onSelect={setSelected} />
      ) : (
        <>
          <SummaryCards products={products} />

          <div className="dashboard-grid">
            <StrideChart data={strideFindings} />
            <ReferencePanel principles={guidingPrinciples} stride={strideReference} />
          </div>

          <SessionsTable products={products} onSelect={setSelected} />
        </>
      )}

      <footer className="dashboard-footer">
        Source: ProdDev.wiki — Information Security: Threat Modeling Program
      </footer>

      {selected && (
        <SystemDetailPanel
          product={selected}
          detail={systemDetails[selected.id]}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

export default App
