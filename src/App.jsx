import "./App.css";
import React from "react";
import { useState } from "react";
import { ethers, BrowserProvider } from "ethers";

// Import the json-file from the ABI
import Messenger from "./artifacts1/contracts/Messenger.sol/Messenger.json";

// Store the contract address in a variable
const messengerContractAddress = "0xd61A5D6fC77aEA5C514A7EDD6B132cCFb5474ccD";  // Deployed on Sepolia testnet

const App = () => {
  // Store message in a local state
  const [message, setMessageValue] = useState();

  // Request access to User's MetaMask account
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  // Function for retrieving message value from smart contract
  const getMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        messengerContractAddress,
        Messenger.abi,
        web3Provider
      );
      try {
        const data = await contract.getMessage();
        console.log(`Data: ${data}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function for updating message value on smart contract
  const setMessage = async () => {
    if (!message) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await web3Provider.getSigner();
      const contract = new ethers.Contract(
        messengerContractAddress,
        Messenger.abi,
        signer
      );
      const transaction = await contract.setMessage(message);
      await transaction.wait();
      setMessageValue("");
      getMessage();
    }
  };

  return (
    <div className="container">
      <button onClick={getMessage}>Message</button>
      <button onClick={setMessage}>Send message</button>

      <input
        onChange={(e) => setMessageValue(e.target.value)}
        placeholder="Write your message here..."
      />
    </div>
  );
};

export default App;