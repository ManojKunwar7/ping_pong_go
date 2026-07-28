package handler

import "github.com/gin-gonic/gin"

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func (HH *HealthHandler) RegisterRoutes(router gin.IRouter) {
	v1 := router.Group("/api/v1")
	HH.RegisterEndpoints(v1)
}

func (HH *HealthHandler) RegisterEndpoints(router gin.IRoutes) {
	router.GET("/health", HH.HeathController)
}

func (HH *HealthHandler) HeathController(c *gin.Context) {
	c.JSON(200, gin.H{
		"status":  true,
		"message": "Hi from server",
	})
}
