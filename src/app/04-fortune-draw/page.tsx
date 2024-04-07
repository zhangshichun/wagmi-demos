"use client";
import { Button, Table, Modal, Select } from "antd";
import { useState } from "react";
import { usePublicClient } from "wagmi";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import PQueue from "p-queue";
const tableColumns = [
  {
    title: "Private Key",
    dataIndex: "privateKey",
    key: "privateKey",
  },
];

const queue = new PQueue({ concurrency: 5 });

const concurrencyOptions = [
  100,
  500,
  1000,
  5000,
  10000
]

const Page = () => {
  const [accountInfos, setAccountInfos] = useState<any>([]);
  const [concurrency, setConcurrency] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const client = usePublicClient();
  const onGenerateClick = async () => {
    const pkArray = [...Array(concurrency)].map(generatePrivateKey);
    const accountArray = pkArray.map((pk) => {
      const account = privateKeyToAccount(pk);
      return {
        privateKey: pk,
        account: account,
      };
    });
    const fns = accountArray.map((info) => {
      const { account } = info;
      return async () => {
        const balance = await client?.getBalance({
          address: account.address,
        });
        const balanceString = balance?.toString() || "0";
        if (balanceString === "0") {
          return;
        }
        Modal.info({
          title: "Success",
          content: `Waaaaaaaaaaa! you got balance: ${balanceString} 💰`,
        });
        setAccountInfos((accountArray: any[]) => [...accountArray, info]);
      };
    });
    queue.addAll(fns, {});
    setLoading(true);
    queue.start();
    queue.on("idle", () => {
      setLoading(false);
      Modal.info({
        title: "It's Ok",
        content: `You got no balance!
        Just try again, Good luck! 🍀`,
      });
    });
  };
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <div className="flex flex-col justify-center items-center gap-2">
        <div >Try to get Balance！！！</div>
        <div>Try <Select value={concurrency} onChange={setConcurrency} className="mx-2" placeholder="Chain" style={{ width: 120 }} options={concurrencyOptions.map(v => ({ label: v, value: v }))}/> times.</div>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={onGenerateClick}
            loading={loading}
            icon
          >
            💰 Get It!
          </Button>
        </div>
      </div>
      {accountInfos.length > 0 && (
        <Table
          pagination={false}
          className="w-[1000px]"
          dataSource={accountInfos}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Page;
