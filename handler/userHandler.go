package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var userMenuId = "user"

func UserMemberHandler(c *gin.Context) {
	view.LoadUserMemberView(c, gin.H{
		"subMenuId": "member",
		"head": map[string]string{
			"menuId":   userMenuId,
			"title":    "會員管理",
			"nickname": adminInfo.nickname,
		},
	})
}

func UserCheckInHandler(c *gin.Context) {
	view.LoadUserCheckInView(c, gin.H{
		"subMenuId": "checkIn",
		"head": map[string]string{
			"menuId":   userMenuId,
			"title":    "人工後台補幣",
			"nickname": adminInfo.nickname,
		},
	})
}
