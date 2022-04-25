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
