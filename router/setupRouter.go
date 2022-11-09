package router

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"slot/handler"

	"slot/middleware"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(middleware.CheckLogin)

	router.GET("/", handler.HomeHandler)
	purviewRouting := router.Group("/purview")
	{
		purviewRouting.GET("/account", handler.PurviewAccountHandler)
		purviewRouting.GET("/account/add", handler.PurviewAccountAddHandler)
		purviewRouting.GET("/group", handler.PurviewGroupHandler)
		purviewRouting.GET("/group/add", handler.PurviewGroupAddHandler)
		purviewRouting.GET("/actLog", handler.PurviewActLogHandler)
	}

	userRouting := router.Group("/user")
	{
		userRouting.GET("/member", handler.UserMemberHandler)
		userRouting.GET("/checkIn", handler.UserCheckInHandler)
	}

	reportRouting := router.Group("/report")
	{
		reportRouting.GET("/days", handler.ReportDaysHandler)
		reportRouting.GET("/member", handler.ReportMemberHandler)
		reportRouting.GET("/channel", handler.ReportChannelHandler)
		reportRouting.GET("/game", handler.ReportGameHandler)
		reportRouting.GET("/transfer", handler.ReportTransferHandler)
	}

	dataSearchRouting := router.Group("/dataSearch")
	{
		dataSearchRouting.GET("/betLog", handler.DataSearchBetLogHandler)
		dataSearchRouting.GET("/onlineUsers", handler.DataSearchOnlineUsersHandler)
		dataSearchRouting.GET("/onlineUserNumber", handler.DataSearchOnlineUserNumberHandler)
		dataSearchRouting.GET("/jackpot", handler.DataSearchJackpotHandler)
		dataSearchRouting.GET("/betLogRank", handler.DataSearchBetLogRankHandler)
	}

	gameRouting := router.Group("/game")
	{
		gameRouting.GET("/jackpotBonus", handler.GameJackpotBonusHandler)
		gameRouting.GET("/probability", handler.GameProbabilityHandler)
		gameRouting.GET("/maintain", handler.GameMaintainHandler)
		gameRouting.GET("/maintain/add", handler.GameMaintainAddHandler)
	}

	platformRouting := router.Group("/platform")
	{
		platformRouting.GET("/channel", handler.PlatformChannelHandler)
		platformRouting.GET("/channel/add", handler.PlatformChannelAddHandler)
	}
	fmt.Println(handler.RefMap)
	fmt.Println("11111111111111111111111111")

	return router
}

func web(*gin.Engine) {

}

func api(*gin.Engine) {

}
