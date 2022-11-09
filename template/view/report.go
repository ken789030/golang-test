package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadReportDaysView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "report/days.html", data)
}

func LoadReportMemberView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "report/member.html", data)
}

func LoadReportChannelView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "report/channel.html", data)
}

func LoadReportGameView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "report/game.html", data)
}

func LoadReportTransferView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "report/transfer.html", data)
}
