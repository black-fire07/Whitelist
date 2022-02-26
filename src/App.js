// import logo from './logo.svg';
import "./App.css";
import react, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [nft, setnft] = useState({});
  const [address, setaddress] = useState("");

  //enter addresses here

  let whitelistaddress = [];

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    // const web3 = useWeb3React();
    if (typeof window.ethereum == "undefined") return;

    await window.ethereum.enable();
    const web3 = new Web3(window.ethereum);

    const Accounts = await web3.eth.getAccounts();

    if (Accounts.length == 0) {
      return;
    }
    setaddress(Accounts[0]);
    const networkId = await web3.eth.net.getId();

    // const hell = Helloabi.networks[networkId];
    if (networkId == 80001) {
      alert("you are connected to polygon");
      const white = new web3.eth.Contract(
        [
          { inputs: [], stateMutability: "nonpayable", type: "constructor" },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "account",
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
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
              },
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
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
              },
              {
                indexed: false,
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
              },
            ],
            name: "TransferBatch",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
              },
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
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "TransferSingle",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
              },
              {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            name: "URI",
            type: "event",
          },
          {
            inputs: [
              { internalType: "address", name: "_add", type: "address" },
            ],
            name: "addWhitelist",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "uint256", name: "id", type: "uint256" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
              },
              { internalType: "uint256[]", name: "ids", type: "uint256[]" },
            ],
            name: "balanceOfBatch",
            outputs: [
              { internalType: "uint256[]", name: "", type: "uint256[]" },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "bought",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "address", name: "operator", type: "address" },
            ],
            name: "isApprovedForAll",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256[]", name: "ids", type: "uint256[]" },
              { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
              { internalType: "bytes", name: "data", type: "bytes" },
            ],
            name: "mintBatch",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
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
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256[]", name: "ids", type: "uint256[]" },
              { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
              { internalType: "bytes", name: "data", type: "bytes" },
            ],
            name: "safeBatchTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "id", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              { internalType: "bytes", name: "data", type: "bytes" },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "operator", type: "address" },
              { internalType: "bool", name: "approved", type: "bool" },
            ],
            name: "setApprovalForAll",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "string", name: "newuri", type: "string" },
            ],
            name: "setURI",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
            ],
            name: "supportsInterface",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "uri",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address[]", name: "users", type: "address[]" },
            ],
            name: "whitelistAddress",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "whitelisted",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        "0xcc71dD26d4Fdf4d96B82A9675d36e57B1868DC8c"
      ); //put deployed address
      setnft(white);
    } else {
      alert("connect to polygon and refresh");
    }
  };

  const wl = () => {
    whitel_(whitelistaddress[0]);
  };

  const whitel_ = async (index) => {
    try {
      await nft.methods
        .addWhitelist(whitelistaddress[index])
        .send({ from: address })
        .on("transactionHash", (hash) => {
          console.log(hash, whitelistaddress[index]);
          if (index + 1 < whitelistaddress.length) {
            whitel_(whitelistaddress[index + 1]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        You won this game! Claim Your Prize!
      </header>
      <div className="image-container">
        <img
          src="https://ik.imagekit.io/bayc/assets/ape3.png"
          className="image"
          alt="nft"
        />
      </div>
      <button
        className="button"
        onClick={() => {
          wl();
        }}
      >
        whitelist
      </button>
    </div>
  );
}

export default App;
