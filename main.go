package main

import (
	"log"
	"html/template"
	"net/http"
)

type IndexData struct {
	Title	string
	Content	string
}

func test(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./index.html"))
	data := new(IndexData)
	data.Title = "首頁"
	data.Content = "我的第一個首頁"
	tmpl.Execute(w, data)
}

func test2(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./index.html"))
	data := new(IndexData)
	data.Title = "首頁"
	data.Content = "我的第二個首頁"
	tmpl.Execute(w, data)
}

func main() {
	http.HandleFunc("/", test)
	http.HandleFunc("/index", test2)
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}