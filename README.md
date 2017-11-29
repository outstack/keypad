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
