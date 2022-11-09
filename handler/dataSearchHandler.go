package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var dataSearchMenuId = "dataSearch"

func DataSearchBetLogHandler(c *gin.Context) {
	view.LoadDataSearchBetLogView(c, gin.H{
		"subMenuId": "betLog",
		"head": map[string]string{
			"menuId":   dataSearchMenuId,
			"title":    "用戶遊戲紀錄",
			"nickname": adminInfo.nickname,
		},
	})
}

func DataSearchOnlineUsersHandler(c *gin.Context) {
	view.LoadDataSearchOnlineUsersView(c, gin.H{
		"subMenuId": "onlineUsers",
		"head": map[string]string{
			"menuId":   dataSearchMenuId,
			"title":    "在線用戶列表",
			"nickname": adminInfo.nickname,
		},
	})
}

func DataSearchOnlineUserNumberHandler(c *gin.Context) {
	view.LoadDataSearchOnlineUserNumberView(c, gin.H{
		"subMenuId": "onlineUserNumber",
		"head": map[string]string{
			"menuId":   dataSearchMenuId,
			"title":    "同時在線人數",
			"nickname": adminInfo.nickname,
		},
	})
}

func DataSearchJackpotHandler(c *gin.Context) {
	view.LoadDataSearchJackpotView(c, gin.H{
		"subMenuId": "jackpot",
		"head": map[string]string{
			"menuId":   dataSearchMenuId,
			"title":    "JP彩金查詢",
			"nickname": adminInfo.nickname,
		},
	})
}

func DataSearchBetLogRankHandler(c *gin.Context) {
	view.LoadDataSearchBetLogRankView(c, gin.H{
		"subMenuId": "betLogRank",
		"head": map[string]string{
			"menuId":   dataSearchMenuId,
			"title":    "投注排行統計",
			"nickname": adminInfo.nickname,
		},
	})
}
