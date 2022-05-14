#!/bin/bash

echo "Easy install tool for mobility blockchain platform"
echo "Select component to install:"
echo "0.all"
echo "1.fleet-node"
echo "2.TOMP-gateway"
echo "3.build fleet2share SDK(identity-ionic-native-plugin)"
echo "4.base-platform(hardhat & ipfs)"
echo "5.platform-services"
echo "6.vehicle-authority"
echo "7.virtual-car-wallet"

function number_prompt() {
  while true; do
      read -p "$1" num
      case $num in
          0 )  ./deploy-scripts/all.sh; break;;
          1 ) ./deploy-scripts/fleet-node.sh; break;;
          2 ) ./deploy-scripts/tomp-gateway.sh; break;;
          3 ) ./deploy-scripts/fleet2share-sdk.sh; break;;
          4 ) ./deploy-scripts/base-platform.sh; break;;
          5 ) ./deploy-scripts/platform-services.sh; break;;
          6 ) ./deploy-scripts/vehicle-authority.sh; break;;
          7 ) ./deploy-scripts/virtual-car-wallet.sh; break;;
      esac
  done
}

number_prompt "Input component number to install CTRL + C to exit:"

