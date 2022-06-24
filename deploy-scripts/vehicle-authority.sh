git clone https://github.com/bloxmove-com/vehicle-authority.git

cd vehicle-authority

git pull

function get_address() {
  contractAddress=`docker exec hardhat-local bash -c "cat /app/contractAddress"`;
  IFS=','
  read -ra addressArr <<<"${contractAddress}"
  didRegistryAddress=${addressArr[0]}
  attestationRegistryAddress=${addressArr[1]}
  ensAddress=${addressArr[2]}
  resolverAddress=${addressArr[3]}
}

get_address
if [[ -z "$didRegistryAddress" ]]; then
  read -p "Enter Vehicle Authority Address: " address
  read -p "Enter Vehicle Authority PrivateKey: " privateKey

  ./init.sh "$address" "$privateKey"
else
  ./init.sh
fi
