const assetlib = require('@bloxmove-com/did-asset-library-core-obfuscated')

const runtimeConfig = {
    web3Provider: 'https://onb.kooltech.com.tw/besu-validator1-rpc',
    chainId: '1000',
    networkName: 'blxm-onboarding',
    ipfsHost: 'local-ipfs.local-ipfs',
    ipfsPort: 5001,
    ipfsProtocol: `http`,
    ipfsBasePath: '/api/v0',
    accountAddress: '0x9784617B20B8f0C14897c65b594dC701EaC27a1d',
    accountPrivateKey: '0x902ab956990c41a0c13e70d3fab86b4d24b92e5b509e7fe3dc72a49b53904503',
    didRegistryAddress: '0x4D659D2831586Bedae902E0d2360392038266aB0',
    attestationRegistryAddress: '0x7edBEFAa8663e36E89Da2f9719d8108fa9236D46',
    ensAddress: '0xeDf4e8248f9CE108c4b7AAb0fA8BeE509C6D247b',
    didDefaultValidity: '31536000000',
    resolverName: 'resolver',
    gasLimit: 6721975
}

const parentDomain = "vin.bloxmove"
const childDomain = 'onboarding.' + parentDomain;
const assetDID = 'did:ethr:blxm-onboarding:0x451C78c255E2b3b760244e457e57C095f15Ba028'

async function init() {

    // init asset service
    const configService = new assetlib.ObjectConfigService(runtimeConfig);
    const ethereumAssetService = new assetlib.EthereumAssetService(configService);
    await ethereumAssetService.init();

    console.log('Set SubDomain ' + childDomain + ', with account: ' + runtimeConfig.accountAddress);


    // check if its already mapped
    const mapped = await ethereumAssetService.resolveName(childDomain);

    if (mapped) {
        throw new Error('Already mapped to ' + mapped);
    }

    await ethereumAssetService.setName(childDomain, assetDID)

    console.log('Check owner of subDomain ' + childDomain);
    const owner = await ethereumAssetService.getOwner(assetDID)
    console.log('The owner of the subdomain ' + childDomain + ' is ' + owner);

    process.exit();
}

init();
