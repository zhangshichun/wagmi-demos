const AccountInfo = ({ privateKey }: { privateKey: string }) => {
  return (
    <div>
      <h1>Account Info</h1>
      <p>Private Key: {privateKey}</p>
    </div>
  )
}

export default AccountInfo;
