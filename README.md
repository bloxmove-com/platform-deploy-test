# Platform-deploy-test
All the tools for deploy and test MBP platform

## Easy installation for the platform
```shell
> ./deploy.sh
Easy install tool for mobility blockchain platform
Select component to install:
0.all
1.fleet-node
2.TOMP-gateway
3.build fleet2share SDK(identity-ionic-native-plugin)

```

Enter `0` to install all component, or you can also enter 1~3 to select the component you want to install.

## Component specific notes

### Fleet-node
You should prepare `1` account keypair for the `Fleet Owner` , you can create it by using MetaMask

### TOMP-gateway

Preparing your TOMP transport-operator `URL`, `MaaS-ID` and `accept language`, here is an example operator for testing purposes
* URL: http://3.123.228.24:8083
* MaaS-ID: d52bfad0-ee4b-4f72-9f38-efce115ffb49
* Accept language: nl

## Tests

### Postman-collections
Open your postman and click `import`->`Folder`, then select `postman-collections` folder

#### fleet-node requests
You can create and get vehicle assets by using the request under `1. create new vehicles`/`1. fleet-node operations`.

There are two requests about fleet-node:

1. `create vehicle asset`: Set the VIN in request body manually and click `Send` to create a vehicle asset.
2. `get vehicle asset`: Modify te VIN in request url and click `Send` to get the did related to that VIN.
