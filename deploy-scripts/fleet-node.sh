git clone https://github.com/bloxmove-com/company-node-public.git

cd company-node-public

read -p "Enter Fleet Owner Address: " address
read -p "Enter Fleet Owner PrivateKey: " privateKey
#read -p "Enter KYC Issuer Address: " kycIssuerAddress
#read -p "Enter KYC Issuer PrivateKey: " kycIssuerPrivateKey

#./init.sh $address $privateKey $kycIssuerAddress $kycIssuerPrivateKey
./init.sh "$address" "$privateKey"

