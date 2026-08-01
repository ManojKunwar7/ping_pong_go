ifndef APP_ENV
	APP_ENV = DEVELOPMENT
endif

BINARY_NAME=backend
MAIN_FILE=main.go
BIN_DIR=./bin

.PHONY: all build run clean

all: build

build:
	@echo "Building the binaries..."
	@mkdir -p $(BIN_DIR)
	go build -race -o $(BIN_DIR)/$(BINARY_NAME) ./cmd/server/$(MAIN_FILE)

run: build
	@echo "Starting in $(APP_ENV)..."
	APP_ENV=$(APP_ENV) $(BIN_DIR)/$(BINARY_NAME)

clean:
	@echo "Cleaning binaries..."
	rm -rf $(BIN_DIR)