"use client";
import { Button } from "antd";
import Image from "next/image";
import {
  useConnect,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { useEffect, useState } from "react";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
};

const ConnectorButton = ({ connector }: { connector: any }) => {
  const [providerReady, setProviderReady] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (!connector) return;
    (async () => {
      try {
        const provider = await connector.getProvider();
        setProviderReady(!!provider);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [connector]);

  const onClick = () => {
    connect({ connector: connector });
  };

  return (
    <Button
      block
      icon={
        connector.icon && <Image
          src={connector.icon}
          width={14}
          height={14}
          alt={connector.name}
        />
      }
      type="default"
      loading={!providerReady}
      onClick={onClick}
    >
      {connector.name}
    </Button>
  );
};

export default function Home() {
  const { connectors } = useConnect();
  const { isConnected } = useAccount();

  if (isConnected) return <Account />;

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === "walletConnect"
  );

  const injectedConnector = connectors.find(
    (connector) => connector.id === "injected"
  );

  const eip6963Connectors = connectors.filter(
    (connector) =>
      connector !== walletConnectConnector && connector !== injectedConnector
  );

  const eip6963Buttons = eip6963Connectors.map((connector) => (
    <ConnectorButton key={connector.id} connector={connector} />
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex w-60 p-2 my-2 border-1 border-black border-dashed flex-col items-center gap-y-1">
        <p>The following are the mobile scan code access capabilities provided by <strong>WalletConnect</strong></p>
        <ConnectorButton connector={walletConnectConnector} />
      </div>
      <div className="inline-flex w-60 p-2 my-2 border-1 border-black border-dashed flex-col items-center gap-y-1">
        <p>The following are the injection link capabilities provided by EIP-1193</p>
        <ConnectorButton connector={injectedConnector} />
      </div>
      <div className="inline-flex w-60 p-2 my-2 border-1 border-black border-dashed flex-col items-center gap-y-1">
        <p>Here are the Chrome extensions supported by your browser, found from EIP-6963</p>
        {eip6963Buttons}
      </div>
    </div>
  );
}
