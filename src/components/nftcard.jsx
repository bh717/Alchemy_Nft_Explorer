
const NftCard = ({ image, id, title, address, tokenID, tokenType }) => {
    
    return (
        <div className="flex flex-row w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <div className="flex bg-gray-600 w-[400px] h-[200px]">
                <img className='w-full rounded-t-md' key={id} src={image}/>
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
                        <p>{tokenType}</p>
                    </div>

                    <div className="flex w-full mt-2 flex-row justify-between align-center">
                        <p>Address :</p>
                        <a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
            </div>
            
        </div>
    )
}

export default NftCard