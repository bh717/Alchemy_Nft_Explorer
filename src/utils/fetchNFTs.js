import { Alchemy, Network } from "alchemy-sdk";

// const apiKey = "eT1Xj8g-NiqQqdy6KKbZkjfQACS3Nrn0";
// const endpoint = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

const config = {
  apiKey: "eT1Xj8g-NiqQqdy6KKbZkjfQACS3Nrn0",
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);
let count = 0;
let flag = 0;

export const fetchNFTs = async (contractAddress, setNFTs, retryAttempt) => {
  if (retryAttempt === 100) {
    return;
  }
  if (contractAddress) {
    const omitMetadata = false;

    // Get all NFTs
    const response = await alchemy.nft.getNftsForContract(contractAddress, {
      omitMetadata: omitMetadata,
    });

    if (response.nfts[count].media.length === 0) {
      await fetchNFTs(contractAddress, setNFTs, retryAttempt + 1);
    } 
    else{
      if(count === response.nfts.length-1)
      {
        setNFTs(response.nfts);
        return;
      }
      count++;
      await fetchNFTs(contractAddress, setNFTs, retryAttempt + 1);
    }

    console.log(response.nfts);
    return response;
  }
};
