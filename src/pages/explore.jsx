
import { useState } from 'react';
import NftCard from '../components/nftcard';

import TransactionCard from '../components/transactioncard';

import {fetchNFTs} from '../utils/fetchNFTs';
import {fetchTransactionHistory} from '../utils/fetchTransactionHistory';
import { Loading } from 'notiflix';
import { useEffect } from 'react';


const Explore = () => {

    const [address, setAddress] = useState("0x303348Fe2b7cD2887D18425866CeB3AD9A56AB20")
    const [contractAddress, setContractAddress] = useState("0x77F625A5BA5EE07275fD8248d69814F471c13fa4")
    const [NFTs, setNFTs] = useState("")
    const [transaction, setTransactionHistory] = useState("")

    useEffect(() => {
        (async () => {
            Loading.standard();
            console.log("address", address);
            console.log("contractAddress:", contractAddress);
            await fetchTransactionHistory( address, setTransactionHistory);
            await fetchNFTs( contractAddress, setNFTs);
            console.log("data:", transaction);
            Loading.remove();
        })();
    }, [address, contractAddress]);


    return (
        <div>
            <header className=' py-24  mb-12 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Alchemy NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                    <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Insert Your wallet address'></input>
                        <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input>
                    </div>
                    
                </div>
            </header>

            <section className='flex flex-col justify-center items-center p-4'>
                
                <div className='flex'>
                    <p>Minted NFT</p>
                </div>

                <div className='flex flex-wrap w-full justify-center'>
                    {NFTs? NFTs.map(NFT => {
                        
                        return (
                            <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} tokenID= {NFT.id.tokenId} tokenType={NFT.id.tokenMetadata.tokenType}></NftCard>
                        )
                    }) : <div>No NFTs found</div>}
                </div>
              
               
            </section>
           
            <section className='flex flex-col w-full border-t-4 flex-wrap justify-center items-center p-4'>

                <div className='flex'>
                    <p>Real time Transaction</p>
                </div>
            
                {transaction ? (
                    <TransactionCard tokenID={transaction.tokenId} from = {transaction.from} to = {transaction.to}></TransactionCard> 
                    // <div>No Transaction Found</div>
                ):(
                    <div>No Transaction Found</div>
                )}

            </section> 

        </div>
    )
}


export default Explore