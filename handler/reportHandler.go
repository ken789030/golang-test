package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var reportMenuId = "report"

func ReportDaysHandler(c *gin.Context) {
	view.LoadReportDaysView(c, gin.H{
		"subMenuId": "days",
		"head": map[string]string{
			"menuId":   reportMenuId,
			"title":    "日/月報表",
			"nickname": adminInfo.nickname,
		},
	})
}

func ReportMemberHandler(c *gin.Context) {
	view.LoadReportMemberView(c, gin.H{
		"subMenuId": "member",
		"head": map[string]string{
			"menuId":   reportMenuId,
			"title":    "會員報表",
			"nickname": adminInfo.nickname,
		},
	})
}

func ReportChannelHandler(c *gin.Context) {
	view.LoadReportChannelView(c, gin.H{
		"subMenuId": "channel",
		"head": map[string]string{
			"menuId":   reportMenuId,
			"title":    "渠道報表",
			"nickname": adminInfo.nickname,
		},
	})
}

func ReportGameHandler(c *gin.Context) {
	view.LoadReportGameView(c, gin.H{
		"subMenuId": "game",
		"head": map[string]string{
			"menuId":   reportMenuId,
			"title":    "遊戲報表",
			"nickname": adminInfo.nickname,
		},
	})
}

func ReportTransferHandler(c *gin.Context) {
	view.LoadReportTransferView(c, gin.H{
		"subMenuId": "transfer",
		"head": map[string]string{
			"menuId":   reportMenuId,
			"title":    "用戶轉出轉入報表",
			"nickname": adminInfo.nickname,
		},
	})
}
