'use client'
import { Button, Table } from "antd"
import { useState } from "react"
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
const tableColumns = [
  {
    title: 'Private Key',
    dataIndex: 'privateKey',
    key: 'privateKey',
  },
  {
    title: 'Address',
    dataIndex: ['account', 'address'],
    key: 'address',
  },
]

const Page = () => {
  const [accountInfos, setAccountInfos] = useState<any>([])
  const onGenerateClick = () => {
    const pk = generatePrivateKey()
    const account = privateKeyToAccount(pk)
    setAccountInfos((accountInfos: any) => [...accountInfos, { privateKey: pk, account }])
  }
  return <div className="flex flex-col items-center justify-start gap-4">
    <div className="flex flex-row justify-center items-center">
      Click to generate a private-key: <Button type="primary" onClick={onGenerateClick}>Generate a private-key</Button>
    </div>
    <Table pagination={false} className="w-[1000px]" dataSource={accountInfos} columns={tableColumns}/>
  </div>
}

export default Page;