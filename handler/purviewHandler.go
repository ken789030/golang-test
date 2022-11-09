package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var purviewMenuId = "purview"

func PurviewAccountHandler(c *gin.Context) {
	view.LoadPurviewAccountView(c, gin.H{
		"subMenuId": "account",
		"head": map[string]string{
			"menuId":   purviewMenuId,
			"title":    "成員管理",
			"nickname": adminInfo.nickname,
		},
	})
}

func PurviewAccountAddHandler(c *gin.Context) {
	view.LoadPurviewAccountAddView(c, gin.H{
		"subMenuId": "account",
		"head": map[string]string{
			"menuId":   purviewMenuId,
			"title":    "新增成員",
			"nickname": adminInfo.nickname,
		},
	})
}

func PurviewGroupHandler(c *gin.Context) {
	view.LoadPurviewGroupView(c, gin.H{
		"subMenuId": "group",
		"head": map[string]string{
			"menuId":   purviewMenuId,
			"title":    "組別管理",
			"nickname": adminInfo.nickname,
		},
	})
}

func PurviewGroupAddHandler(c *gin.Context) {
	view.LoadPurviewGroupAddView(c, gin.H{
		"subMenuId": "group",
		"head": map[string]string{
			"menuId":   purviewMenuId,
			"title":    "新增組別",
			"nickname": adminInfo.nickname,
		},
	})
}

func PurviewActLogHandler(c *gin.Context) {
	view.LoadPurviewActLogView(c, gin.H{
		"subMenuId": "actLog",
		"head": map[string]string{
			"menuId":   purviewMenuId,
			"title":    "操作日誌",
			"nickname": adminInfo.nickname,
		},
	})
}
