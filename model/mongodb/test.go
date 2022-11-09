package mongodb

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type sunshareboy struct {
	Name string
	Age  int
	City string
}

func InsertOne(client mongo.Client, ctx context.Context) {
	collection := client.Database("test").Collection("sunshare")

	wanger := sunshareboy{"wanger", 24, "北京"}
	insertOne, err := collection.InsertOne(ctx, wanger)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Insered a Single Document: ", insertOne.InsertedID)
}

func InsertMany(client mongo.Client, ctx context.Context) {
	collection := client.Database("test").Collection("sunshare")

	kao := sunshareboy{"高偉哲", 38, "新竹"}
	matchi := sunshareboy{"麻糬", 35, "新北"}
	tim := sunshareboy{"tim", 28, "新北"}
	otis := sunshareboy{"otis", 28, "新北"}
	ken := sunshareboy{"ken", 32, "新北"}
	hoho := sunshareboy{"hoho", 30, "台中"}
	boys := []interface{}{kao, matchi, tim, otis, ken, hoho}
	insertMany, err := collection.InsertMany(ctx, boys)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Insered multiple Document: ", insertMany.InsertedIDs)
}

func QueryOne(client mongo.Client, ctx context.Context) {
	collection := client.Database("test").Collection("sunshare")

	var result sunshareboy
	filter := bson.D{{"name", "wanger"}}

	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Found a single document: %v\n", result)
}

func QueryMany(client mongo.Client, ctx context.Context) {
	collection := client.Database("test").Collection("sunshare")

	findOptions := options.Find()
	findOptions.SetLimit(5)

	var results []*sunshareboy

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var result sunshareboy

		err := cur.Decode(&result)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, &result)
		fmt.Println(result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.TODO())
	fmt.Printf("Found multiple documents (array of pointers): %v\n", results)
}
