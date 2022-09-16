
const apiKey = "eT1Xj8g-NiqQqdy6KKbZkjfQACS3Nrn0";
const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

export const fetchCheckOwner = async ( contractAddress, tokenID, retryAttempt) => {
  if (retryAttempt === 100) {
    return;
  }
  if (contractAddress) {
    let data;
    try {
      //Get Nft Metadata From Contract
      var requestOptions = {
        method: 'get',
        redirect: 'follow'
      };

      data = await fetch(
        `${endpoint}/getOwnersForToken?contractAddress=${contractAddress}&tokenId=${tokenID}`,
        requestOptions
      ).then((data) => data.json());

      
    } catch (e) {
        fetchCheckOwner(endpoint, contractAddress, tokenID, retryAttempt + 1);
    }

    return data;
  }
};
