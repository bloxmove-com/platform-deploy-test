/**
 * Run: node ./setCompanyVerification.js "companyDID" "kycAccountPrivateKey"
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
    accountAddress: '0x9784617B20B8f0C14897c65b594dC701EaC27a1d',
    accountPrivateKey: process.argv[3],
    didRegistryAddress: '0x4D659D2831586Bedae902E0d2360392038266aB0',
    attestationRegistryAddress: '0x7edBEFAa8663e36E89Da2f9719d8108fa9236D46',
    ensAddress: '0xeDf4e8248f9CE108c4b7AAb0fA8BeE509C6D247b',
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