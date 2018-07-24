#!/usr/bin/env bash
MANAGER_IP=$(vagrant ssh-config swarm-manager|grep HostName|awk '{print $2}')
vagrant ssh -c "docker swarm init --advertise-addr ${MANAGER_IP}" swarm-manager
SWARM_TOKEN=$(vagrant ssh -c "docker swarm join-token worker" swarm-manager|grep token|awk '{print $5}')
for x in 1 2; do
   vagrant ssh -c "docker swarm join --token ${SWARM_TOKEN} ${MANAGER_IP}:2377" swarm-node-${x}
done
vagrant ssh -c "docker stack deploy --compose-file /vagrant/selenium-swarm.yml selenium" swarm-manager
