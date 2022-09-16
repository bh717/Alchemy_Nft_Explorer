
const apiKey = "eT1Xj8g-NiqQqdy6KKbZkjfQACS3Nrn0";
const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

export const fetchTransactionHistory = async (contractaddress, setTransactionHistory,  retryAttempt) => {
  if (retryAttempt === 9) {
    return;
  }
  if (contractaddress) {
    let transData;
    let count;
    try {
      //Get NFT Transaction History from Contract
     
        let transaction_data = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 0,
            "method": "alchemy_getAssetTransfers",
            "params": [
            {
                "fromBlock": "0x0",
                "toBlock": "latest",
                "contractAddresses": [contractaddress],
                "excludeZeroValue":false,
                "category": ["erc721"]
            }
            ]
        });

        var transaction_requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: transaction_data,
            redirect: 'follow'
        };

        transData = await fetch(`${endpoint}`, transaction_requestOptions).then((transaction_data) => transaction_data.json());

        count = transData.result.transfers.length;
        console.log("ct:", count);
        console.log(transData.result.transfers[count-1]);
    } catch (e) {
        fetchTransactionHistory(endpoint,  contractaddress, retryAttempt + 1);
    }
    setTransactionHistory(transData.result.transfers[count-1]);
    return transData;
  }
};
