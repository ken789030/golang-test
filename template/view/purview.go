package view

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func LoadPurviewAccountView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "purview/account.html", data)
}

func LoadPurviewAccountAddView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "purview/accountAdd.html", data)
}

func LoadPurviewGroupView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "purview/group.html", data)
}

func LoadPurviewGroupAddView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "purview/groupAdd.html", data)
}

func LoadPurviewActLogView(c *gin.Context, data gin.H) {
	c.HTML(http.StatusOK, "purview/actLog.html", data)
}
