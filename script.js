const ethers = require('ethers');
import numpy as np;
// import ethers from "ethers"

let provider = new ethers.providers.Web3Provider(window.ethereum);

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "playerName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rk",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "team",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "capHit",
				"type": "uint256"
			}
		],
		"name": "addPlayer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPlayerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Rk",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "PlayerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Team",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "CapHit",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalPlayers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "playerNames",
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
				"name": "",
				"type": "string"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Rk",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "PlayerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Team",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "CapHit",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

let contract = new ethers.Contract(contractAddress, contractABI, provider);
let signer = provider.getSigner();
contract = contract.connect(signer);

document.getElementById('playerForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the form from being submitted normally

    // Get the form data
    let playerName = document.getElementById('playerName').value;
    let rk = document.getElementById('rk').value;
    let position = document.getElementById('position').value;
    let team = document.getElementById('team').value;
    let capHit = document.getElementById('capHit').value;

    let epsilon = 1.0;
    rk = rk + np.random.laplace(0, 1/epsilon);
    capHit = capHit + np.random.laplace(0, 1/epsilon);
    try {
        // Call your smart contract's addPlayer function
        let tx = await contract.addPlayer(playerName, rk, position, team, capHit);
        console.log(tx);

        console.log("Transaction submitted, waiting for the blockchain...");
        
        // Wait for the transaction to be processed
        let receipt = await tx.wait();

        // Check if the transaction was successful
        if (receipt.status === 1) {
            console.log("Transaction successful!");
        } else {
            console.log("Transaction failed!");
        }
    } catch (error) {
        // Handle any errors that occurred while submitting the transaction
        console.error("An error occurred!", error);
    }
});
