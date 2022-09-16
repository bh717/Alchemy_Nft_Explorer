import { useEffect } from "react";
import { useState } from "react"

const TransactionCard = ({ tokenID, from , to}) => {
    const [_tokenID, setTokenID] = useState(0);

    useEffect(()=>{
        setTokenID(Number(tokenID));
    },[])
    return (
        <div className="flex flex-row w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <div className="flex flex-col ml-6 p-3 w-[100%] justify-center">
                    <div className="flex w-full justify-center">
                        <p>Last Transaction</p>
                    </div>
                    <div className="flex w-full flex-row justify-between align-center">
                        <p>TokenID:</p>
                        <p>{_tokenID}</p>
                    </div>

                    <div className="flex w-full flex-row justify-between align-center">
                        <p>From:</p>
                        <p>{`${from.slice(0, 4)}...${from.slice(from.length - 4)}`}</p>
                    </div>

                    <div className="flex w-full flex-row justify-between align-center">
                        <p>To:</p>
                        <p>{`${to.slice(0, 4)}...${to.slice(to.length - 4)}`}</p>
                    </div>
            </div>
            
        </div>
    )
}

export default TransactionCard