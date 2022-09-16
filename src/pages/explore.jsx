
import { useState } from 'react';
import NftCard from '../components/nftcard';
import NftTransferCard from '../components/nfttransfercard';

import TransactionCard from '../components/transactioncard';

import {fetchNFTs} from '../utils/fetchNFTs';
import {fetchTransactionHistory} from '../utils/fetchTransactionHistory';
import { Loading } from 'notiflix';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Explore = () => {

    const [address, setAddress] = useState("0x303348Fe2b7cD2887D18425866CeB3AD9A56AB20")
    const [contractAddress, setContractAddress] = useState("0x77F625A5BA5EE07275fD8248d69814F471c13fa4")
    const [NFTs, setNFTs] = useState("")
    const [transaction, setTransactionHistory] = useState("")


    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
          setIsConnected(true);
        });
        
        socket.on('notification', (notificationBody) => {
            console.log("got notification");
        });

        socket.on('disconnect', () => {
          setIsConnected(false);
        });
    
        socket.on('pong', () => {
          setLastPong(new Date().toISOString());
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('pong');
        };
      }, [])

    useEffect(() => {
        (async () => {
            Loading.standard();
            console.log("address", address);
            console.log("contractAddress:", contractAddress);
            await fetchTransactionHistory( contractAddress, setTransactionHistory);
            await fetchNFTs( contractAddress, setNFTs);
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

            <section className='flex flex-row justify-center items-center p-4 w-full'>
                <div className='flex flex-col justify-center items-center p-4 w-full'>
                    <div className='flex'>
                        <p>UnTransfered Minted NFT</p>
                    </div>

                    <div className='flex flex-col w-full justify-center'>
                        {NFTs? NFTs.map(NFT => {
                            
                            return (
                                <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} contractaddress={contractAddress} address= {address.toLowerCase()} tokenID= {NFT.id.tokenId} tokenType={NFT.id.tokenMetadata.tokenType}></NftCard>
                            )
                        }) : <div>No NFTs found</div>}
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center p-4 w-full'>
                    <div className='flex'>
                        <p>Transfered Minted NFT</p>
                    </div>

                    <div className='flex flex-col w-full justify-center'>
                        {NFTs? NFTs.map(NFT => {
                            
                            return (
                                
                                <NftTransferCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} contractaddress={contractAddress} address= {address.toLowerCase()} tokenID= {NFT.id.tokenId} tokenType={NFT.id.tokenMetadata.tokenType}></NftTransferCard>
                            )
                        }) : <div>No NFTs found</div>}
                    </div>
                </div>
               
            </section>
           
            <section className='flex flex-col w-full border-t-4 flex-wrap justify-center items-center p-4'>

                <div className='flex flex-col'>
                    <p>Real time Transaction</p>

                    <p>Connected: { '' + isConnected }</p>
                    <p>Last pong: { lastPong || '-' }</p>
      
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