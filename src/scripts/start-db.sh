#!/bin/bash
set -e

SERVER="soc-server";
PW="mysecretpassword";
DB="soc_db";

while getopts e:m: flag
do
    case "${flag}" in
        e) env=${OPTARG};;
        m) mode=${OPTARG};;
    esac
done

if [ "$env" = "dev" ]
then
    port=5433
elif [ "$env" = "prod" ]
then
    port=5432
fi

if [ "$mode" = "start" ]
then
    echo "start docker [$SERVER]";
    docker start $SERVER;
elif [ "$mode" = "restart" ]
then
    echo "restart docker [$SERVER]";
    docker restart $SERVER;
elif [ "$mode" = "create" ]
then
    echo "stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
    (docker kill $SERVER || :) && \
    (docker rm $SERVER || :) && \
    docker run --name $SERVER \
    -e POSTGRES_PASSWORD=$PW \
    -e PGPASSWORD=$PW \
    -p $port:5432 \
    -d postgres
fi

echo "sleep & wait for pg-server [$SERVER] to start";
sleep 3;

if [ "$mode" = "create" ]
then
    echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
    echo "\l" | docker exec -i $SERVER psql -U postgres
fi
