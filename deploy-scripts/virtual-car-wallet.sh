git clone https://github.com/bloxmove-com/virtual-car-wallet.git

cd virtual-car-wallet

git pull

read -p "Enter Wallet Owner Address: " address
read -p "Enter Wallet  Owner PrivateKey: " privateKey
#read -p "Enter KYC Issuer Address: " kycIssuerAddress
#read -p "Enter KYC Issuer PrivateKey: " kycIssuerPrivateKey

#./init.sh $address $privateKey $kycIssuerAddress $kycIssuerPrivateKey
./init.sh "$address" "$privateKey"

