// // set provider
if (typeof web3 == "undefined") {
	//ip of machine running ethereum(miner)
    web3 = new Web3(new Web3.providers.HttpProvider("http://10.129.28.61:8545"));
}
