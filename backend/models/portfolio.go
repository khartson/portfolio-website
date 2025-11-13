package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Type enum of portfolio items
type Type string

const (
	File   Type = "file"
	Folder Type = "folder"
)

// Type language for portfolio items (of supported languages for frontend rendering)
type Language string

const (
	Markdown Language = "markdown"
	Python   Language = "python"
	Ruby     Language = "ruby"
	Ini      Language = "ini"
	Json     Language = "json"
	Pdf      Language = "pdf"
	Default  Language = "default"
)

type FileTreeEntry struct {
	ID       uuid.UUID `gorm:"type:uuid;primary_key;" json:"id"`
	Name     string    `gorm:"not null" json:"name"`
	Type     Type      `gorm:"not null" json:"type"`
	Language Language  `gorm:"type:text;not null" json:"language"`
	Content  string    `gorm:"type:text" json:"content"`
	ParentID uuid.UUID `gorm:"type:uuid;index" json:"-"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	Parent   *FileTreeEntry   `gorm:"foreignKey:ParentID" json:"-"`
	Children []*FileTreeEntry `gorm:"foreignKey:ParentID" json:"children"`
}

func (entry *FileTreeEntry) BeforeCreate(tx *gorm.DB) error {
	if entry.ID == uuid.Nil {
		entry.ID = uuid.New()
	}
	return nil
}
