import { useDataProvider } from "@/context";
import { IMAGE_5k, IMAGE_EXEC } from "@/index";
import styles from "@/styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { useAccount } from "wagmi";
import Web3 from "web3";
// import CheckButton from "../../src/components/CheckButton";

export default function Dashboard() {
  const { data: session } = useSession();
  const {
    getIsFirstAccess,
    setIsFirstAccess,
    setLastReading,
    getLastReading,
    getGrantAccess,
    setGrantAccess,
  } = useDataProvider();
  const { setContract, getContract } = useDataProvider();
  const injectedETh = window.ethereum;
  const contract = getContract();
  const { address } = useAccount();
  const [welcomeLoading, setWelcomeLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [mintLoading, setMintLoading] = useState(false);
  const [mintMessage, setMintMessage] = useState("");

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
  const isFirstAccess = getIsFirstAccess();
  const lastReading = getLastReading();

  const grantAccess = getGrantAccess();

  const storedInfo = localStorage.getItem("firstAccess");

  useEffect(() => {
    const storedData = localStorage.getItem("isChecked");

    if (!storedData) return;

    const parsedData: boolean = JSON.parse(storedData);

    setGrantAccess(parsedData);
  }, []);

  const toggleNotifications = (state: boolean) => {
    localStorage.setItem("isChecked", String(state));

    if (state && lastReading) {
      setWelcomeLoading(true);
      (async () => {
        const res = await fetch("/api/protector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: lastReading.email,
          }),
        });

        if (!res) {
          setWelcomeMessage("Failed minting NFT");
          setTimeout(() => {
            setWelcomeLoading(false);
          }, 2000);
          return;
        }

        console.log("res", await res.json());

        setWelcomeMessage("NFT minted successfully");

        setTimeout(() => {
          setWelcomeLoading(false);
        }, 2000);
      })();
    }

    setGrantAccess(state);
  };

  useEffect(() => {
    if (!storedInfo) return;

    const parsedInfo: boolean = JSON.parse(storedInfo);

    setIsFirstAccess(parsedInfo);
  }, [setIsFirstAccess, storedInfo]);

  useEffect(() => {
    if (session) {
      (async () => {
        const res = await fetch(
          `/api/historical?refreshToken=${(session as any).refreshToken}`
        );

        if (res) {
          const { data: parsedData } = await res.json();

          if (!parsedData) return;

          if (parsedData.length !== 0) {
            const lastData = parsedData.reduce((prev: any, current: any) => {
              return prev.value > current.value ? prev : current;
            });

            setLastReading({ email: lastData.email, steps: lastData.value });
          }
        }
      })();
    }
  }, [session, setLastReading]);

  const mintFirstNFT = async () => {
    setWelcomeLoading(true);
    setWelcomeMessage("Loading ...");

    try {
      const res = await contract.methods
        .firstMint(address)
        .send({ from: address });

      console.log("res", res);

      res && localStorage.setItem("firstAccess", String(false));
      setTimeout(() => setWelcomeLoading(false), 2000);
    } catch (err) {
      setWelcomeMessage("Failed to mint NFT");
      setTimeout(() => setWelcomeLoading(false), 2000);
      setWelcomeMessage("");
      return;
    }
  };

  const mintTodaysNFT = async () => {
    // if (!lastReading?.steps) return;

    const steps = lastReading?.steps;

    setMintLoading(true);
    setMintMessage("Loading ...");

    try {
      const res = await contract.methods.mint(7000).send({ from: address });

      console.log("res", res);
      setMintMessage("Minted NFT successfully");
      setTimeout(() => setMintMessage("Good Job! Come back tomorrow!"), 2000);
    } catch (err) {
      setMintMessage("Failed to mint NFT");
      setTimeout(() => setMintLoading(false), 2000);
      setMintMessage("");
      return;
    }
  };

  return (
    <section className={styles.sectionFullScreen}>
      <div className={styles.dashboardContainer}>
        <div className={styles.gridColsTwo}>
          <div className={styles.flexCenterCol}>
            <h2>Todays Challenge</h2>
            <Image
              alt="Daily Goal NFT"
              className={styles.dashboardImage}
              src={IMAGE_5k}
              onClick={async () => {
                const res = await fetch(
                  `/api/historical?refreshToken=${
                    (session as any).refreshToken
                  }`
                );

                if (res) {
                  const { data: parsedData } = await res.json();
                  console.log("data", parsedData);
                }
              }}
            />
            <div className={styles.dashboardBtn}>Try and claim it</div>
          </div>
          <div className={styles.flexCenterCol}>
            <h2>Last Accomplishment</h2>
            <Image
              alt="Last Accomplishment NFT"
              className={styles.dashboardImage}
              src={IMAGE_5k}
            />
          </div>
        </div>
        <div className={styles.bottomSection}>
          <h2 className={styles.bottomSectionText}>
            Ready to show todays work?
          </h2>
          <GoogleButton
            onClick={() =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/dashboard",
              })
            }
          />
        </div>
      </div>
      <footer className={styles.dashboardFooter}>
        <div className={styles.toggleCTA}>
          <h3>All data protected by </h3>
          <Image src={IMAGE_EXEC} height={44} width={120} alt="iExec" />
        </div>
      </footer>
    </section>
  );
}
