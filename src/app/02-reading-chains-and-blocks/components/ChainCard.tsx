'use client'
import { Spin } from 'antd';
import cx from 'classnames';
import { useBlockNumber, useEstimateFeesPerGas } from 'wagmi'
const ChainCard = ({ className, chain }: { className?: string, chain: any }) => {
  const { data: blockNumber, isLoading: isBlockNumberLoading} = useBlockNumber({ chainId: chain.id, watch: true })
  const { data: gasPriceInfo, isLoading: isGasPriceLoading } = useEstimateFeesPerGas({ chainId: chain.id })
  return <div className={cx(className)}>
    <table border={1}>
      <tbody>
        <tr>
          <td>Chain Name: </td><td><label className="color-blue">{chain.name}</label></td>
        </tr>
        <tr>
          <td>Chain Id: </td><td><label className="color-blue">{chain.id}</label></td>
        </tr>
        <tr>
          <td>Block Explorer Url:</td><td width={400}><a href={chain.blockExplorers?.default?.url} className="color-blue">{chain.blockExplorers?.default?.url}</a></td>
        </tr>
        <tr>
          <td>Native Currency: </td><td><label className="color-blue">{chain.nativeCurrency?.name} ({chain.nativeCurrency?.symbol})</label></td>
        </tr>
        <tr>
          <td>Block Number:</td><td><label className="color-blue">{ isBlockNumberLoading ? <Spin /> : (blockNumber)?.toString?.() }</label></td>
        </tr>
        <tr>
          <td>max fee per gas(EIP-1559 Transactions):</td><td><label className="color-blue">{ isGasPriceLoading ? <Spin /> : gasPriceInfo?.formatted?.maxFeePerGas } gwei</label></td>
        </tr>
      </tbody>
    </table>
  </div>
}
export default ChainCard;