# Selenium Grid in Docker swarm configuration

## What Is this?
A reference project that instantiates Selenium Grid Hub and browser node containers in a swarm configuration on VMs created via your vsphere instance

## What are the prerequisites?
A VMware vsphere instance with existing Linux-based VM templates!

## I don't have access to a vsphere instance!
Make the necessary edits to the Vagrantfile for your favorite provider

## What's in this repo?
- A sample Vagrantfile with definitions for Docker Swarm manager and worker nodes
- A docker compose yml file with definitions for Selenium Grid and 7 replicants of Chrome and Firefox browser nodes
- A bash script that enables swarm mode and joins workers to the manager
- A sample Protractor configuration with settings that enable parallel execution of test spec files across all browser nodes

## Setup
- Set environment variables
  - VSPHERE_USER (Valid user for your vsphere instance)
  - VSPHERE_PASS (You will be prompted for a password if this variable is not set)
- Fill in empty VM configuration values that are specific to vsphere

## How to run
- `vagrant up` to create VMs
- `./swarm-setup.sh` to enable docker swarm and join worker nodes to manager
