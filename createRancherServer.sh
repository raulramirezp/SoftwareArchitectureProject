#!/bin/bash

echo "****************************"
echo "* Creando servidor rancher *"
echo "****************************"

docker-machine create -d virtualbox --virtualbox-memory "1024" --virtualbox-cpu-count "-1" --virtualbox-disk-size "5000" --virtualbox-boot2docker-url https://github.com/boot2docker/boot2docker/releases/download/v1.12.3/boot2docker.iso servidor-rancher

echo "*******************************"
echo "* Finalizado, verificando...  *"
echo "*******************************"

docker-machine ls

echo "******************************"
echo "* Ubicandose en el servidor  *"
echo "******************************"

eval $(docker-machine env servidor-rancher)

echo "*************************************"
echo "* Ejecutando el contenedor rancher  *"
echo "*************************************"

docker run -d --restart=always --name=servidor-rancher -p 8080:8080 rancher/server

