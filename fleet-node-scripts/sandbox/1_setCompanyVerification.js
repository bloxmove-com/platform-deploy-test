/**
 * Run: node ./setCompanyVerification.js "companyDID" "kycAccountPrivateKey"
 */
const assetlib = require('@bloxmove-com/did-asset-library-core-obfuscated')

const runtimeConfig = {
    web3Provider: 'https://stablestage.kooltech.com.tw/besu-validator1-rpc',
    chainId: '1000',
    networkName: 'blxm-stable-stage',
    ipfsHost: 'stablestage.kooltech.com.tw',
    ipfsPort: 443,
    ipfsProtocol: `https`,
    ipfsBasePath: '/ipfs/api/v0',
    // accountAddress: '0x071CEf853a8f8f6E49c8292196c0aF49CBB2b5ab',
    accountAddress: process.argv[3],
    accountPrivateKey: process.argv[4],
    didRegistryAddress: '0xe9Ed0193467607CdE5DF2150FB22bad50C0c78DB',
    attestationRegistryAddress: '0x784Dc6cdb7d7e74e571Ff73ddF46917A67CBa7aC',
    ensAddress: '0xd4aa5a98628Bc346676BAA87219C90997D785337',
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
