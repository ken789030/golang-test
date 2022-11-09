package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

func HomeHandler(c *gin.Context) {
	view.LoadHomeView(c, gin.H{
		"subMenuId": "",
		"head": map[string]string{
			"menuId":   "",
			"title":    "首頁",
			"nickname": adminInfo.nickname,
		},
	})
}
