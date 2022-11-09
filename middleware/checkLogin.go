package middleware

import (
	"fmt"
	"slot/model"
	"strings"

	"github.com/gin-gonic/gin"
)

func CheckLogin(c *gin.Context) {
	// account := "admin"

	fmt.Println("get the Path : " + c.Request.URL.Path)
	fmt.Println("CheckLoginCheckLoginCheckLoginCheckLogin")
	j := strings.Index(c.Request.URL.Path, "user")
	fmt.Println(j)
	model.Mongo()
	// mongo.QueryMany()
}
