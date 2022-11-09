package handler

import (
	"slot/template/view"

	"github.com/gin-gonic/gin"
)

var gameMenuId = "game"

func GameJackpotBonusHandler(c *gin.Context) {
	view.LoadGameJackpotBonusView(c, gin.H{
		"subMenuId": "jackpotBonus",
		"head": map[string]string{
			"menuId":   gameMenuId,
			"title":    "JP獎金設定",
			"nickname": adminInfo.nickname,
		},
	})
}

func GameProbabilityHandler(c *gin.Context) {
	view.LoadGameProbabilityView(c, gin.H{
		"subMenuId": "probability",
		"head": map[string]string{
			"menuId":   gameMenuId,
			"title":    "機台機率設定",
			"nickname": adminInfo.nickname,
		},
	})
}

func GameMaintainHandler(c *gin.Context) {
	view.LoadGameMaintainView(c, gin.H{
		"subMenuId": "maintain",
		"head": map[string]string{
			"menuId":   gameMenuId,
			"title":    "遊戲維護管理",
			"nickname": adminInfo.nickname,
		},
	})
}

func GameMaintainAddHandler(c *gin.Context) {
	view.LoadGameMaintainAddView(c, gin.H{
		"subMenuId": "maintain",
		"head": map[string]string{
			"menuId":   gameMenuId,
			"title":    "新增遊戲維護",
			"nickname": adminInfo.nickname,
		},
	})
}
