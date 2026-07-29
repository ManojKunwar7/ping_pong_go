package handler

import (
	"github.com/ManojKunwar7/ping_pong_go/backend/internal/middleware"
	"github.com/gin-gonic/gin"
)

type RootHandler struct{}

func NewRootHandler() *RootHandler {
	return &RootHandler{}
}

func (rh *RootHandler) SetUpRouter(router *gin.Engine) {
	router.Use(middleware.CORS())

	healthHandler := NewHealthHandler()
	gameHandler := NewGameHandler()
	// ! Register Routes
	gameHandler.RegisterRoutes(router)
	healthHandler.RegisterRoutes(router)

}
