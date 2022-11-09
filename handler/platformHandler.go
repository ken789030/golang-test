package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var platformMenuId = "platform"

func PlatformChannelHandler(c *gin.Context) {
	view.LoadPlatformChannelView(c, gin.H{
		"subMenuId": "channel",
		"head": map[string]string{
			"menuId":   platformMenuId,
			"title":    "渠道管理",
			"nickname": adminInfo.nickname,
		},
	})
}

func PlatformChannelAddHandler(c *gin.Context) {
	view.LoadPlatformChannelAddView(c, gin.H{
		"subMenuId": "channel",
		"head": map[string]string{
			"menuId":   platformMenuId,
			"title":    "渠道管理",
			"nickname": adminInfo.nickname,
		},
	})
}
