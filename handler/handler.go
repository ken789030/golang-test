package handler

import (
	"github.com/gin-gonic/gin"
)

type RefFunc struct {
	Method string
	Path   []string
	F      func(c *gin.Context)
}

var RefMap []RefFunc

type AdminInfo struct {
	account   string
	nickname  string
	adminType int
}

var adminInfo = AdminInfo{
	"admin",
	"最高管理員",
	0,
}

func init() {

}

func handler() {

}
