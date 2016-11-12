# Command to run so that other clients can access

geth --datadir path_to_testnet init ./genesisblock.json
geth --rpccorsdomain "*" --rpcaddr "10.129.28.61" --rpc --networkid 8545 --datadir .ethereum_test1/  --unlock "0x59da0acd0f1a8adde682b6b5ce77f57bdf8aa1ac" console

# Tips
Use high gas value(500000)
