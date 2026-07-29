package handler

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type GameHandler struct{}

// ! Websocket Frame
var upgrader = websocket.Upgrader{
	ReadBufferSize:  4096,
	WriteBufferSize: 4096,
	CheckOrigin: func(r *http.Request) bool {
		// TODO in fucture if needed
		return true
	},
}

func NewGameHandler() *GameHandler {
	return &GameHandler{}
}

func (gh *GameHandler) RegisterRoutes(router gin.IRouter) {
	v1 := router.Group("/v1")
	gh.RegisterEndpoints(v1)
}

func (gh *GameHandler) RegisterEndpoints(router gin.IRoutes) {
	router.GET("/ws", gh.ServeWSController)
}

func (gh *GameHandler) ServeWSController(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upgrade connection"})
		return
	}

	playerID := c.Query("id")
	if playerID == "" {
		playerID = "player_" + strconv.Itoa(int(time.Now().UnixMilli()))
	}
}
