'use client'
import cx from 'classnames';

const ChainCard = ({ className, chain }: { className?: string, chain: any }) => {
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
      </tbody>
    </table>
  </div>
}
export default ChainCard;