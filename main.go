package main

import (
	"errors"
	"net/http"
	"slot/router"
	"slot/util"

	"github.com/gin-gonic/gin"
)

type IndexData struct {
	Title   string
	Content string
}

func LoginPage(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", nil)
}

func LoginPage2(c *gin.Context) {
	c.HTML(http.StatusOK, "_login.html", nil)
}

func LoginAuth(c *gin.Context) {
	var (
		username string
		password string
	)

	if in, isExist := c.GetPostForm("username"); isExist && in != "" {
		username = in
	} else {
		c.HTML(http.StatusBadRequest, "_login.html", gin.H{
			"error": errors.New("必須輸入使用者名稱"),
		})
		return
	}

	if in, isExist := c.GetPostForm("password"); isExist && in != "" {
		password = in
	} else {
		c.HTML(http.StatusBadRequest, "_login.html", gin.H{
			"error": errors.New("必須輸入密碼名稱"),
		})
		return
	}

	if err := util.Auth(username, password); err == nil {
		c.HTML(http.StatusOK, "_login.html", gin.H{
			"success": "登入成功",
		})
		return
	} else {
		c.HTML(http.StatusUnauthorized, "_login.html", gin.H{
			"error": err,
		})
		return
	}

}

func test(c *gin.Context) {
	data := new(IndexData)
	data.Title = "首頁"
	data.Content = "我的第一支 gin 專案"
	c.HTML(http.StatusOK, "_index.html", data)
}

func main() {

	server := router.SetupRouter()

	server.LoadHTMLGlob("template/html/**/*.html")
	// server.LoadHTMLGlob("template/html/*")
	// 設定靜態資源的讀取
	server.Static("/assets", "./template/assets")

	server.GET("/login", LoginPage)
	server.GET("/_login", LoginPage2)
	server.POST("/login", LoginAuth)
	server.Run(":8888")
	// database.Mongo()
}
