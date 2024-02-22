RoverAuth:
	rover config auth

UserCheck:
	rover subgraph introspect http:localhost:3510/graphql | rover subgraph check volunteerX@current --schema - --name users

UserPublish:
	rover subgraph introspect http:localhost:3510/graphql | rover subgraph publish volunteerX@current --schema - --name users --routing-url http://192.168.1.222:3510/graphql

PingCheck:
	npx rover subgraph check volunteerX@current --schema ./apps/ping/src/ping/graphql/ping.gql --name ping

PingPublish:
	npx rover subgraph publish volunteerX@current --schema ./apps/ping/src/ping/graphql/ping.gql --name ping --routing-url 	http://192.168.1.222:3520/graphql