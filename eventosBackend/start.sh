#!/bin/bash
echo "**************************"
echo "* Ubicandose en el nodo1 *"
echo "**************************"
eval $(docker-machine env rancher-node1)

echo "**************************"
echo "*        Build           *"
echo "**************************"
docker-compose build
echo "**************************"
echo "* db create and migrate   *"
echo "**************************"

docker-compose run --rm web rails db:create
docker-compose run --rm web rails db:migrate
echo "**************************"
echo "*        Up app          *"
echo "**************************"
docker-compose up
