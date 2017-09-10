#!/bin/bash

echo "*******************************"
echo " Deteniendo nodo1 ..."
echo "*******************************"

docker-machine stop nodo1-rancher

echo "*******************************"
echo " Deteniendo servidor rancher ..."
echo "*******************************"

docker-machine stop servidor-rancher


