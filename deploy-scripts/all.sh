echo "Deploy base-platform:"
./deploy-scripts/base-platform.sh
echo "Base-platform is deployed and running!"
echo

echo "Deploy platform-services:"
./deploy-scripts/platform-services.sh
echo "Platform-services is deployed and running!"
echo

echo "Deploy virtual-car-wallet:"
./deploy-scripts/virtual-car-wallet.sh
echo "Virtual-car-wallet is deployed and running!"
echo

echo "Deploy vehicle-authority:"
./deploy-scripts/vehicle-authority.sh
echo "Vehicle-authority is deployed and running!"
echo

echo "Deploy fleet-node:"
./deploy-scripts/fleet-node.sh
echo "Fleet-node is deployed and running!"
echo

echo
echo "Deploy TOMP-gateway:"
./deploy-scripts/tomp-gateway.sh
echo "TOMP-gateway deployed and running!"
echo

echo
echo "Build fleet2share sdk:"
./deploy-scripts/fleet2share-sdk.sh
echo

echo "All Done!"
