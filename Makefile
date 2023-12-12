RoverAuth:
	npx rover config auth

UserCheck:
	npx rover subgraph check volunteerX@current --schema ./apps/users/src/users/graphql/user.gql --name users

UserPublish:
	npx rover subgraph publish volunteerX@current --schema ./apps/users/src/users/graphql/user.gql --name users --routing-url 	http://192.168.1.222:3510/graphql

PingCheck:
	npx rover subgraph check volunteerX@current --schema ./apps/ping/src/ping/graphql/ping.gql --name ping

PingPublish:
	npx rover subgraph publish volunteerX@current --schema ./apps/ping/src/ping/graphql/ping.gql --name ping --routing-url 	http://192.168.1.222:3520/graphql