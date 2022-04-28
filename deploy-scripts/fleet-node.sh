git clone https://github.com/bloxmove-com/fleet-node.git

cd fleet-node

read -p "Enter Fleet Owner Address: " address
read -p "Enter Fleet Owner PrivateKey: " privateKey
read -p "Enter KYC Issuer Address: " kycIssuerAddress
read -p "Enter KYC Issuer PrivateKey: " kycIssuerPrivateKey

./init.sh $address $privateKey $kycIssuerAddress $kycIssuerPrivateKey

