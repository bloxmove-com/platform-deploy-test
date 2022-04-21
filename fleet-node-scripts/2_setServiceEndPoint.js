/**
 * Run: node .\2_setServiceEndpointFleetNode.js "fleetOwnerAddress" "fleetOwnerAccountPrivateKey" "endpointUrl"
 */

const assetlib = require('@bloxmove-com/did-asset-library-core')

const runtimeConfig = {
    web3Provider: 'https://stablestage.kooltech.com.tw/besu-validator1-rpc',
    chainId: '1000',
    networkName: 'blxm-stable-stage',
    ipfsHost: 'stablestage.kooltech.com.tw',
    ipfsPort: 443,
    ipfsProtocol: `https`,
    ipfsBasePath: '/ipfs/api/v0',
    accountAddress: process.argv[2], // Fleet Owner 1
    accountPrivateKey: process.argv[3],
    didRegistryAddress: '0xe9Ed0193467607CdE5DF2150FB22bad50C0c78DB',
    attestationRegistryAddress: '0x784Dc6cdb7d7e74e571Ff73ddF46917A67CBa7aC',
    ensAddress: '0xd4aa5a98628Bc346676BAA87219C90997D785337',
    didDefaultValidity: '31536000000',
    resolverName: 'resolver',
    gasLimit: 6721975
}

async function init() {

    // init asset service
    const configService = new assetlib.ObjectConfigService(runtimeConfig);
    const ethereumAssetService = new assetlib.EthereumAssetService(configService);
    await ethereumAssetService.init();

    await setAndGetDIDDocument(ethereumAssetService);

    process.exit();
}

async function setAndGetDIDDocument(ethereumAssetService) {
    const did = `did:ethr:${runtimeConfig.networkName}:${runtimeConfig.accountAddress}`;
    console.log('did: ' + did);
    const document = await ethereumAssetService.getDIDDocument(did);

    const service = [{
        id: `${did}`,
        type: `fleetNode`,
        serviceEndpoint: process.argv[4],
    }];

    // to reset service endpoints set null for document.service and run the script
    document.service = service;
    await ethereumAssetService.setDIDDocument(document);

    const retrieved = await ethereumAssetService.getDIDDocument(did);
    console.log('retrieved Document: ')
    console.log(retrieved);
}

init();