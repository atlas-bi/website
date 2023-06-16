random_number() {
  floor=3000
  range=3999
  number=0
  while [ "$number" -le $floor ]
  do
    number=$RANDOM
    let "number %= $range"
  done
  echo $number
}

get_port() {
  PORT=$(random_number)
  while [[ $(lsof -i -P -n | grep :$PORT) ]]
  do
    PORT=$(random_number)
  done
  echo $PORT
}