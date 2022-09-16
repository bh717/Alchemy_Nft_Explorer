/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { useEffect } from "react";

import { fetchCheckOwner } from "../utils/fetchOwnedNfts";

const NftTransferCard = ({
  image,
  id,
  title,
  contractaddress,
  address,
  tokenID,
  tokenType,
}) => {
  const [nftOwner, setOwner] = useState("");
  const [_tokenID, setTokenID] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchCheckOwner(
        contractaddress,
        tokenID,
        setOwner
      );
      setOwner(response.owners[0]);
    }
    fetchData();

    setTokenID(Number(tokenID));

  }, []);

  return nftOwner?(
    nftOwner !== address && (
      <div className="flex flex-row w-1/4 mr-3 mb-4 bg-slate-100 rounded-md w-full">
        <div className="flex bg-gray-600 w-[400px] h-[200px]">
          <img className="w-[400px] h-[200px]" key={id} src={image} />
        </div>
        <div className="flex flex-col ml-6 p-3 w-[100%] justify-center">
          <div className="flex w-full flex-row justify-between align-center">
            <p>Title:</p>
            <h3 className="text-[18px]">{title}</h3>
          </div>

          <div className="flex w-full mt-2 flex-row justify-between align-center">
            <p>TokenID:</p>
            <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
          </div>

          <div className="flex w-full mt-2 flex-row justify-between align-center">
            <p>TokenType :</p>
            <p>{_tokenID}</p>
          </div>

          <div className="flex w-full mt-2 flex-row justify-between align-center">
            <p>Contract Address :</p>
            <p>{`${contractaddress.slice(0, 4)}...${contractaddress.slice(
              contractaddress.length - 4
            )}`}</p>
          </div>

          <div className="flex w-full mt-2 flex-row justify-between align-center">
            <p>Minted Address :</p>
            <p>{`${address.slice(0, 4)}...${address.slice(
              address.length - 4
            )}`}</p>
          </div>

          <div className="flex w-full mt-2 flex-row justify-between align-center">
            <p>Owner :</p>
            <p>{`${nftOwner.slice(0, 4)}...${nftOwner.slice(
              nftOwner.length - 4
            )}`}</p>
          </div>
        </div>
      </div>
    )
  ):null;
};

export default NftTransferCard;
