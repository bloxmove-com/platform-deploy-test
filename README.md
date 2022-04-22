# platform-deploy-test
All the tools for deploy and test MBP platform

## Run the scripts
Build a Docker image for running the scripts in reproducible containers.

```
docker build -t <name:tag> -f <script_directory>/Dockerfile .
docker run --rm <name:tag> node ./<script_name> <params_for_scripts>...
```

For example:
```
docker build -t platform-deploy-test/fleet-node:stable -f ./fleet-node-scripts/Dockerfile .
docker run --rm platform-deploy-test/fleet-node:stable node ./1_setCompanyVerification.js "script_param1" "script_param2"...
```