package game

import (
	"time"
)

const (
	FrameRate = 16 * time.Millisecond // ~ 60 fps
)

type GameState struct {
	BallX         float64 `json:"ballX"`
	BallY         float64 `json:"ballY"`
	BallVelocityX float64 `json:"ballVelocityX"`
	BallVelocityY float64 `json:"ballVelocityY"`
	Player1Y      float64 `json:"player1Y"`
	Player2Y      float64 `json:"player2Y"`
	Score1        int     `json:"socre1"`
	Score2        int     `json:"socre2"`
	Width         float64 `json:"canvasWidth"`  // Synced back to frontend
	Height        float64 `json:"canvasHeight"` // Synced back to frontend
}

type PaddleMove struct {
	PlayerNum int
	Y         float64
}

type GameEngine struct {
	state     GameState
	roomChan  chan<- []byte
	inputChan chan PaddleMove
	stopChan  chan struct{}
}

func NewGameEngine(roomChan chan<- []byte, width float64, height float64) *GameEngine {
	return &GameEngine{
		roomChan:  roomChan,
		inputChan: make(chan PaddleMove),
		stopChan:  make(chan struct{}),
		state: GameState{
			Width:         width,
			Height:        height,
			BallX:         width / 2,
			BallY:         height / 2,
			BallVelocityX: 5.0,
			BallVelocityY: 5.0,
			Player1Y:      height / 2.4,
			Player2Y:      height / 2.4,
			Score1:        0,
			Score2:        0,
		},
	}
}

func (ge *GameEngine) InputChan() chan<- PaddleMove {
	return ge.inputChan
}

func (ge *GameEngine) StopChan() {
	close(ge.stopChan)
}

func (ge *GameEngine) Run() {
	// TODO
}

func (ge *GameEngine) ResetBall() {
	ge.state.BallX = ge.state.Width / 2
	ge.state.BallY = ge.state.Height / 2
	ge.state.BallVelocityX = -ge.state.BallVelocityX
}
