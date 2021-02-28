const Web3 = require('web3')

// get chain info
async function getChainId() {
  const web3 = new Web3('https://http-mainnet.hecochain.com')
  const chainId = await web3.eth.getChainId()
  console.log(`chain id: ${chainId}`)
  return chainId
}

// create account
const account = new Web3Accounts().create()
//do not do this on prd env
console.log(`account generated. address: ${account.address}, private key: ${account.privateKey}`)

// create transaction

async function transfer(fromAccount, to, value) {
  const web3 = new Web3('https://http-mainnet.hecochain.com')
  const chainId = await web3.eth.getChainId()
  const nonce = await web3.eth.getTransactionCount(fromAccount.address)
  const gasPrice = await web3.eth.getGasPrice()

  const unsigned = {
    from: fromAccount.address,
    to,
    value: web3.utils.numberToHex(web3.utils.toWei(value, 'ether')),
    gasPrice,
    nonce,
    chainId
  }

  unsigned.gas = await web3.eth.estimateGas(unsigned)

  const signed = await fromAccount.signTransaction(unsigned)
  return signed
}
