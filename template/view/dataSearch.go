package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadDataSearchBetLogView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "dataSearch/betLog.html", data)
}

func LoadDataSearchOnlineUsersView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "dataSearch/onlineUsers.html", data)
}

func LoadDataSearchOnlineUserNumberView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "dataSearch/onlineUserNumber.html", data)
}

func LoadDataSearchJackpotView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "dataSearch/jackpot.html", data)
}

func LoadDataSearchBetLogRankView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "dataSearch/betLogRank.html", data)
}
