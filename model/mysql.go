package model

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	USERNAME = "ken"
	PASSWORD = "123456"
	NETWORK  = "tcp"
	SERVER   = "127.0.0.1"
	PORT     = 3306
	DATABASE = "slot"
)

type User struct {
	ID       string
	Username string
	Password string
}

func QueryUser(db *sql.DB, username string) {
	user := new(User)
	row := db.QueryRow("SELECT * FROM users where username = ?", username)
	if err := row.Scan(&user.ID, &user.Username, &user.Password); err != nil {
		fmt.Printf("映射使用者失敗，原因為:%v\n", err)
		return
	}
	fmt.Println("Query Users Success ", *user)
}

func Mysql() {

	conn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
	db, err := sql.Open("mysql", conn)
	if err != nil {
		fmt.Println("開啟 MySQL 連線發生錯誤，原因為：", err)
		return
	}
	if err := db.Ping(); err != nil {
		fmt.Println("資料庫連線錯誤，原因為：", err.Error())
		return
	}
	defer db.Close()
	QueryUser(db, "test")
}
