#!/bin/bash

echo "****************************"
echo "* Creando nodo1 rancher... *"
echo "****************************"

docker-machine create -d virtualbox --virtualbox-memory "1548" --virtualbox-cpu-count "1" --virtualbox-disk-size "10000" --virtualbox-boot2docker-url https://github.com/boot2docker/boot2docker/releases/download/v1.12.3/boot2docker.iso --engine-storage-driver overlay nodo1-rancher

echo "*******************************"
echo "* Finalizado, verificando...  *"
echo "*******************************"

docker-machine ls

