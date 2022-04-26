#!/bin/bash

echo "Easy install tool for mobility blockchain platform"
echo "Select component to install:"
echo "0.all"
echo "1.fleet-node"
echo "2.TOMP-gateway"
echo "3.build fleet2share SDK(identity-ionic-native-plugin)"

function number_prompt() {
  while true; do
      read -p "$1" num
      case $num in
          0 )  ./deploy-scripts/all.sh; break;;
          1 ) ./deploy-scripts/fleet-node.sh; break;;
          2 ) ./deploy-scripts/tomp-gateway.sh; break;;
          3 ) ./deploy-scripts/fleet2share-sdk.sh; break;;
      esac
  done
}

number_prompt "Input component number to install CTRL + C to exit:"

