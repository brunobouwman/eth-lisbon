"use client";

import { useDataProvider } from "@/context";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useAccount } from "wagmi";
import Web3 from "web3";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { setContract, getContract } = useDataProvider();
  const injectedETh = window.ethereum;
  const contract = getContract();

  const test = async () => {
    const response = await fetch("http://localhost:3000/api/updateHealthData", {
      method: "POST",
    });
  };

  useEffect(() => {
    console.log("here");
    const params = {
      // Format your parameters similar to how they are passed in Docker
      iexec_args: "encryptTest 0xabcdefghijklmnopqrstuv 'Test data to encrypt'",
    };

    (async () => {
      if (!window.ethereum) return;

      // const response = await fetch(
      //   "http://localhost:3000/api/updateHealthData",
      //   { method: "POST" }
      // );
      // const chainId = 134;

      // const iExec = new IExec({ ethProvider: 134 });
      // console.log("exec", iExec);

      // const appOrder = await iExec.order.createApporder({
      //   app: "0xc38aeD5DB047cFbCC20Aef91F8749bF3391E9bC3",
      //   appprice: "0",
      //   volume: "1",
      // });

      // const signedAppOrder = await iExec.order.signApporder(appOrder);

      // const workerPoolOrder = await iExec.order.createWorkerpoolorder({
      //   workerpool: "0x5AA676E7991cB55d2b87ec0915E36Cc7e7B9c8eD",
      //   workerpoolprice: "0",
      //   volume: "1",
      //   category: "1",
      // });

      // const signedWorkerPoolOrder = await iExec.order.signWorkerpoolorder(
      //   workerPoolOrder
      // );

      // const requestOrder = await iExec.order.createRequestorder({
      //   requester: "0x35bC01A7e00568960e158e59486de522E2b6CAF6",
      //   app: "0xc38aeD5DB047cFbCC20Aef91F8749bF3391E9bC3",
      //   appmaxprice: "0",
      //   datasetmaxprice: "0",
      //   workerpoolmaxprice: "0",
      //   volume: "1",
      //   category: "1",
      //   params: JSON.stringify(params),
      // });

      // const singedRequest = await iExec.order.signRequestorder(requestOrder);

      // const deal = await iExec.order.matchOrders({
      //   apporder: signedAppOrder,
      //   workerpoolorder: signedWorkerPoolOrder,
      //   requestorder: singedRequest,
      // });

      // console.log("Deal submitted", deal);
      // try {
      //   const deal = await iExec.order.matchOrders({
      //     apporder: await iExec.order.createApporder({
      //       app: "0xc38aeD5DB047cFbCC20Aef91F8749bF3391E9bC3",
      //       appprice: "0",
      //       volume: "1",
      //     }),
      //     workerpoolorder: await iExec.order.createWorkerpoolorder({
      //       workerpool: "0x5AA676E7991cB55d2b87ec0915E36Cc7e7B9c8eD",
      //       workerpoolprice: "0",
      //       volume: "1",
      //     }),
      //     requestorder: await iExec.order.createRequestorder({
      //       requester: "0x35bC01A7e00568960e158e59486de522E2b6CAF6",
      //       app: "0xc38aeD5DB047cFbCC20Aef91F8749bF3391E9bC3",
      //       category: "1",
      //       params: JSON.stringify({}),
      //     }),
      //   });
      // } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    if (!injectedETh) return;

    const web3 = new Web3(injectedETh);

    const contractABI = [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_prefixURI",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ERC721EnumerableForbiddenBatchMint",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC721IncorrectOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ERC721InsufficientApproval",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "approver",
            type: "address",
          },
        ],
        name: "ERC721InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "ERC721InvalidOperator",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC721InvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
        ],
        name: "ERC721InvalidReceiver",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "ERC721InvalidSender",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ERC721NonexistentToken",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "ERC721OutOfBoundsIndex",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "lastGoal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "stepCount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "firstGoal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "firstMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_prefixURI",
            type: "string",
          },
        ],
        name: "setPrefixURI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_newGoal",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "updateGoal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "entries",
        outputs: [
          {
            internalType: "uint256",
            name: "dailyGoal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "getLastGoal",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "userAddress",
            type: "address",
          },
        ],
        name: "getUserHistory",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "dailyGoal",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct WellNFT.Entry[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "tokenByIndex",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "tokenType",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "uintToString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userDataHistory",
        outputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const contractAddress = "0x1e2319EdBfb7BB0e9311898113747F42A65C74e0";

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    contract && setContract(contract);
  }, [injectedETh, setContract]);

  // useEffect(() => {
  //   if (!address || !contract) return;

  //   (async () => {
  //     const res = await contract.methods
  //       .getUserHistory(address)
  //       .call({ from: address });

  //     if (!res) {
  //       console.log("Failed to interact with contract");
  //       return;
  //     }

  //     localStorage.setItem("firstAccess", String(res.length == 0));
  //   })();
  // }, [address, contract]);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
      <Head>
        <title>Well Well Well</title>
        <meta name="description" content="Generated by create-wc-dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div
          className={styles.backdrop}
          style={{
            opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
          }}
        />
        <div className={styles.header}>
          <div className={styles.logo}>
            <h2>WELL WELL WELL</h2>
          </div>
          <div className={styles.buttons}>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isNetworkSwitchHighlighted ? styles.highlightSelected : ``
              }`}
            >
              <w3m-network-button />
            </div>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isConnectHighlighted ? styles.highlightSelected : ``
              }`}
            >
              <w3m-button />
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {address ? (
          <div className={styles.mainCTA}>
            <h1>Ready to Start ?</h1>
            {/* <GoogleButton
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: "/dashboard",
                })
              }
            /> */}
            <GoogleButton onClick={() => test()} />
          </div>
        ) : (
          <h1>Connect your wallet</h1>
        )}
      </main>
    </>
  );
}
