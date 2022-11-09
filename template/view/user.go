package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadUserMemberView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "user/member.html", data)
}

func LoadUserCheckInView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "user/checkIn.html", data)
}
