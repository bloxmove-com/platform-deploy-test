/**
 * Run: node .\2_setServiceEndpointFleetNode.js "fleetOwnerAddress" "fleetOwnerAccountPrivateKey" "endpointUrl"
 */

const assetlib = require('@bloxmove-com/did-asset-library-core-obfuscated')

const runtimeConfig = {
    web3Provider: 'http://hardhat-local:8545',
    chainId: '1000',
    networkName: 'blxm-local',
    ipfsHost: 'ipfs-local',
    ipfsPort: 5001,
    ipfsProtocol: `http`,
    ipfsBasePath: '/api/v0',
    // accountAddress: '0x071CEf853a8f8f6E49c8292196c0aF49CBB2b5ab',
    accountAddress: process.argv[2],
    accountPrivateKey: process.argv[3],
    didRegistryAddress: process.argv[5],
    attestationRegistryAddress: process.argv[6],
    ensAddress: process.argv[7],
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
    // console.log('retrieved Document: ')
    // console.log(retrieved);
}

init();
