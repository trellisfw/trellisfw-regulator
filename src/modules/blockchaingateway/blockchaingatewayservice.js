import BlockchainGateway from './blockchaingateway'

export default {
  createPAC(pac) {
    return BlockchainGateway().post('createPAC', pac);
  },
  readPAC(pacRequest) {
		console.log("--> blockchain service pacRequest", pacRequest);
    return BlockchainGateway().get('readPAC', pacRequest);
  },
  getPAC(pacRequest) {
		console.log("--> blockchain service pacRequest", pacRequest);
    return BlockchainGateway().post('getPAC', pacRequest);
  },
  queryAll() {
    return BlockchainGateway().get('queryAll')
  },
}
