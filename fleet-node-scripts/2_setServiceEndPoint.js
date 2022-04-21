/**
 * Run: node .\2_setServiceEndpointFleetNode.js "fleetOwnerAddress" "fleetOwnerAccountPrivateKey" "endpointUrl"
 */

const assetlib = require('@bloxmove-com/did-asset-library-core')

const runtimeConfig = {
    web3Provider: 'https://onb.kooltech.com.tw/besu-validator1-rpc',
    chainId: '1000',
    networkName: 'blxm-onboarding',
    ipfsHost: 'onb.kooltech.com.tw',
    ipfsPort: 443,
    ipfsProtocol: `https`,
    ipfsBasePath: '/ipfs/api/v0',
    accountAddress: process.argv[2], // Fleet Owner 1
    accountPrivateKey: process.argv[3],
    didRegistryAddress: '0x4D659D2831586Bedae902E0d2360392038266aB0',
    attestationRegistryAddress: '0x7edBEFAa8663e36E89Da2f9719d8108fa9236D46',
    ensAddress: '0xeDf4e8248f9CE108c4b7AAb0fA8BeE509C6D247b',
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