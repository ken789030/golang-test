package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadGameJackpotBonusView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "game/jackpotBonus.html", data)
}

func LoadGameProbabilityView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "game/probability.html", data)
}

func LoadGameMaintainView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "game/maintain.html", data)
}

func LoadGameMaintainAddView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "game/maintainAdd.html", data)
}
