package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadPlatformChannelView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "platform/channel.html", data)
}

func LoadPlatformChannelAddView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "platform/channelAdd.html", data)
}
