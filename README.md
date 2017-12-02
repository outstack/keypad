# OutStack Keypad

## What is it? 

Keypad is a tiny HTTP-enabled NodeJS server for exposing application configuration (especially secrets) to application build processes.

It's especially useful in CI/CD environments to avoid accidentally exposing application secrets, for example in intermediate docker layers, files not removed or secrets committed to repositories.

## When to use

 - Building docker images
 - Accessing private dependencies
 - Deploying code from CI/CD environments

## When not to use

 - Distributing secrets to production environments
 - Managing complex access roles
 - Leasing, access revocation, rolling keys
 - High security secret access

This especially should not be used or served on the internet, or in any publicly available setting. If you find you need any of these things, consider one of these alternatives:

 - [Hashicorp Vault](https://www.vaultproject.io/)
 - [Consul](https://www.consul.io/)
 - [Docker Secret Management](https://docs.docker.com/engine/swarm/secrets/) (swarm-only)

See also:
 - [Habitus](http://www.habitus.io/)
 - [A DIY version of this](https://farazdagi.com/2016/using-ssh-private-keys-securely-when-building-docker-images/)

## How to use

Pull and run docker image:

    docker run -d -p 80:80 outstack/keypad
    
Add configuration or secrets. This could come from your CI environment (e.g. [Gitlab Secret Variables](https://docs.gitlab.com/ce/ci/variables/README.html#secret-variables))

    curl --fail -X PUT http://127.0.0.1:80/secret/key -d "new secret"

Access new key

    curl --fail --silent -X GET http://127.0.0.1:80/secret/key

To access these keys from a `docker build` you will need to pass in the host/IP of the keypad server
as it would be available from inside the docker build process. E.g. `--build-arg KEYPAD=IP_ACCESSIBLE_TO_BUILD` .

This is currently the most tricky part of the setup and a little long-winded right now. See [./example](./example) for
and example, currently running on Travis in this repository.


