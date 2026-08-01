package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	AppPort string `mapstructure:"PORT"`
	GinMode string `mapstructure:"GIN_MODE"`
}

func LoadConfig(path string) *Config {
	viper.AddConfigPath(".")
	viper.SetConfigName(path)
	viper.SetConfigType("env")

	if err := viper.ReadInConfig(); err != nil {
		log.Println("NO .env file found, using system variables")
	}

	viper.AutomaticEnv()

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		log.Println("NO .env file found, using system variables")
	}

	return &config
}
