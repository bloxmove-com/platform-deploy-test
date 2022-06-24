/**
 * Run: node ./setCompanyVerification.js "companyDID" "kycAccountPrivateKey"
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
    accountAddress: process.argv[3],
    accountPrivateKey: process.argv[4],
    didRegistryAddress: process.argv[5],
    attestationRegistryAddress: process.argv[6],
    ensAddress: process.argv[7],
    didDefaultValidity: '31536000000',
    resolverName: 'resolver',
    gasLimit: 6721975
}


const subjectIdentity = process.argv[2];
if (!subjectIdentity) {
    throw new Error('company identity not provided');
}

console.log(runtimeConfig)

const topic = '/company';

async function init() {

    // init asset service
    const configService = new assetlib.ObjectConfigService(runtimeConfig);
    const ethereumAssetService = new assetlib.EthereumAssetService(configService);
    await ethereumAssetService.init();

    const credentialSubject = {
        id: `${subjectIdentity}`,
        company: true,
        proofPurpose: "assertionMethod"
    }
    const vc = await ethereumAssetService.createVerifiableCredential(['CompanyCredential'], credentialSubject, 'assertionMethod')
    await ethereumAssetService.setAttestation(
        `${subjectIdentity}`,
        topic,
        vc
    );

    await new Promise(f => setTimeout(f, 15000));

    const attestation = await ethereumAssetService.getAttestations(subjectIdentity, topic)
    console.log('extracted claims about user ' + JSON.stringify(attestation));

    process.exit();
}

init();
