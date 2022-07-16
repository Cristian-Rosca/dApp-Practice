import React, {useState, useEffect} from 'react';
import { ethers } from "ethers";


function App() {

  const {greet, setGreet} = useState('');
  const [balance, setBalance] = useState();
  const [greetingValue, setGreetingValue] = useState(''); // note to use [], not {}
  const [depositValue, setDepositValue] = useState(0);



  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

  // import the contract abi 
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  // create contract object 
  const contract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    const connectWallet = async () => {
      provider.send("eth_requestAccounts", []);
    }

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress)
      const balanceFormatted = ethers.utils.formatEther(balance)
      setBalance(balanceFormatted)
    }

    connectWallet()
      .catch(console.error)

    getBalance()
      .catch(console.error)
  })
  
  
  

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value)
  }
  
  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
  }

  const handleDepositSubmit = (e) => { // 'e' for event
    e.preventDefault(); // prevents from form default being submitted and auto-refreshing the page
    console.log(depositValue);
  }

  const handleGreetingSubmit = (e) => {
    e.preventDefault();
    console.log(greetingValue);
  }

  return (
    <div className="container">
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <h3>Greetings</h3>
            <p>Contract Balance: {balance}</p>
          </div>
          <div className="col">
          <form onSubmit={handleDepositSubmit}>
              <div className="mb-3">
                <input type="number" className="form-control" placeholder = "0" onChange={handleDepositChange} value={depositValue}/>
              </div>
              <button type="submit" className="btn btn-success">Deposit</button>
          </form>
          <form className="mt-5" onSubmit={handleGreetingSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control"  onChange={handleGreetingChange} value={greetingValue}/>
              </div>
              <button type="submit" className="btn btn-dark">Change</button>
          </form>
          </div>
          
        </div>
    </div>
</div>
  );
}

export default App;
