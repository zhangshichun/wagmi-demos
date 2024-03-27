'use client'
import { useChains } from "wagmi"
import { Select } from "antd"
import ChainCard from "./components/ChainCard"
import React from "react"
const Page = () => {
  const chains = useChains()
  const [selectedId, setSelectedId] = React.useState()
  const selectedChain = chains.find(t => t.id === selectedId)

  return <div>
    <div className="flex flex-row justify-center items-center">
      Please pick a chain: <Select value={selectedId} onChange={setSelectedId} className="mx-2" placeholder="Chain" style={{ width: 120 }} options={chains.map(t => ({ label: t.name, value: t.id }))}/>
    </div>
    { selectedChain && <ChainCard chain={selectedChain} /> }
  </div>
}

export default Page;