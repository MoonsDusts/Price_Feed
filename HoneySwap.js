
    getMoonsPrice();

    async function getMoonsPrice(){

    
     const {ChainId, Fetcher, Route, Trade, TokenAmount, TradeType,Token} = require ('@1hive/honeyswap-sdk');
    const ethers = require('ethers');
    Web3 = require('web3')
    const fs = require('fs');



    const url = 'https://rpc.xdaichain.com/';
    const web3 = new Web3('https://rpc.xdaichain.com/');
   
    const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    
    const xMoon = new Token(ChainId.XDAI, '0x1e16aa4Df73d29C029d94CeDa3e3114EC191E25A', 18)
    const xDdai = new Token(ChainId.XDAI, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', 18)
    
    const chainId = ChainId.XDAI;
    const tokenAddress = '0x1e16aa4Df73d29C029d94CeDa3e3114EC191E25A'



	const xmoon = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
    const xdai = await Fetcher.fetchTokenData(chainId, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', customHttpProvider);
	
	const pair = await Fetcher.fetchPairData(xdai, xmoon, customHttpProvider);
	const route = new Route([pair], xmoon,xdai);
	const trade = new Trade(route, new TokenAmount(xmoon,10000000 ), TradeType.EXACT_INPUT);
    
	console.log("Execution Price Xmoon --> Xdai:", trade.executionPrice.toSignificant(6));
 

    fs.writeFile("price.txt", trade.executionPrice.toSignificant(6) , function(err) {
        if(err) {
            return console.log(err);
        }
      
    });    

    }
