#!/bin/bash

echo "*******************************"
echo " Iniciando servidor rancher ..."
echo "*******************************"

docker-machine start servidor-rancher

echo "*******************************"
echo " Iniciando nodo 1 ..."
echo "*******************************"

docker-machine start nodo1-rancher

