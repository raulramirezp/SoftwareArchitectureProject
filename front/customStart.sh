if [[ $1 == 'local' ]]; then
  cd src/app/_services
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/localhost:3000\/';/" event.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/localhost:3000\/';/" generalSearch.service.ts
  sed -i "11s/.*/  private localhostaddress = 'http:\/\/localhost:3000\/';/" user-search.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/localhost:3000\/';/" user.service.ts
  cd ../../..
  ng serve
elif [[ $1 == 'docker' ]]; then
  cd src/app/_services
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.99.101:3000\/';/" event.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.99.101:3000\/';/" generalSearch.service.ts
  sed -i "11s/.*/  private localhostaddress = 'http:\/\/192.168.99.101:3000\/';/" user-search.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.99.101:3000\/';/" user.service.ts
  cd ../../..
  eval $(docker-machine env rancher-events)
  ./start.sh
elif [[ $1 == 'lan' ]]; then
  cd src/app/_services
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.1.3:3000\/';/" event.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.1.3:3000\/';/" generalSearch.service.ts
  sed -i "11s/.*/  private localhostaddress = 'http:\/\/192.168.1.3:3000\/';/" user-search.service.ts
  sed -i "13s/.*/  private localhostaddress = 'http:\/\/192.168.1.3:3000\/';/" user.service.ts
  cd ../../..
  eval $(docker-machine env rancher-events)
  ./start.sh
else
  echo 'No hay opcion'
  echo "./customStart.sh <option>"
  echo "  <option> [local, docker, lan]"
fi
