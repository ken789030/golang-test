package model

import (
	"context"
	"fmt"
	"log"
	"slot/model/mongodb"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const TEST = "test"

func Mongo() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	var ctx = context.TODO()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Connected to MongoDB!\n")

	databases, err := client.ListDatabaseNames(ctx, bson.M{})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(10 * time.Second)

	fmt.Println(databases)

	fmt.Printf("\n")

	mongodb.QueryOne(*client, ctx)
	// QueryMany(*client, ctx)

	// defer client.Disconnect(ctx)

}
