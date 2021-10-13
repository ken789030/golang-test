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
	// w.WriteHeader(http.StatusOK)
	str := `<!DOCTYPE html>
<html>
<head><title>首頁</title></head>
<body><h1>首頁</h1><p>我的第一個首頁</p></body>
</html>`
	w.Write([]byte(str))
}

func main() {
	http.HandleFunc("/", test)
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}