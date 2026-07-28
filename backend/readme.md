## Folder structure

```md
backend/
├── cmd/
│   └── server/
│       └── main.go       # Application entry point (initializes routes & server)
├── internal/
│   ├── config/
│   │   └── config.go     # Environment variables and app configuration
│   ├── game/
│   │   ├── engine.go     # Core Ping Pong game state / loops
│   │   └── hub.go        # Manages WebSocket connections for players
│   ├── handler/
│   │   ├── game_handler.go # Handles WebSocket routes / upgrades
│   │   └── health.go     # Handles basic REST routes (like /health)
│   │   └── root.go       # Consist all the routes
│   ├── middleware/
│   │   └── cors.go       # Custom middleware (CORS handling)
│   ├── repository/
│   │   ├── postgres.go  # Connects to Postgres
│   │   ├── mongodb.go   # Connects to MongoDB
│   │   ├── redis.go     # Connects to Redis
│   │   └── repository.go # Master struct that groups all DB clients    # Database connection logic (if saving scores)
├── go.mod                # Tracks dependencies
└── go.sum                # Tracks dependency checksums
```