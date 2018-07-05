#!/bin/bash

servers="47.96.87.41"
appname="server-0.0.1"

rm -f target/server-*.jar

mvn clean

echo "-- clean complete! --"

mvn install

for server in $servers
do
    scp target/$appname.jar root@$server:server-0.0.1    
    ssh $server -l root "sudo rm -f /etc/init.d/gserver; sudo ln -s $appname.jar /etc/init.d/gserver; sudo chmod +x $appname.jar; sudo update-rc.d gserver defaults; service gserver restart"
done

echo "-- deploy complete! --"


