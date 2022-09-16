
const apiKey = "eT1Xj8g-NiqQqdy6KKbZkjfQACS3Nrn0";
const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

export const fetchNFTs = async ( contractAddress, setNFTs, retryAttempt) => {
  if (retryAttempt === 100) {
    return;
  }
  if (contractAddress) {
    let data;
    try {
      //Get Nft Metadata From Contract
      const withMetadata = "true";

      var requestOptions = {
        method: "get",
        headers: { "Content-Type": "application/json" },
        body: data,
        redirect: "follow",
      };

      data = await fetch(
        `${endpoint}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=${withMetadata}`,
        requestOptions
      ).then((data) => data.json());

      
    } catch (e) {
      fetchNFTs(endpoint, contractAddress, setNFTs, retryAttempt + 1);
    }

    setNFTs(data.nfts);
    console.log(data.nfts);
    return data;
  }
};
