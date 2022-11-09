package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadHomeView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "home/index.html", data)
}
