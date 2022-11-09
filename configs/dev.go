package configs

var DEV = make(map[string]interface{})

func init() {
	DEV["MongodbHost"] = "localhost"
	DEV["MongodbPort"] = "27017"
}
