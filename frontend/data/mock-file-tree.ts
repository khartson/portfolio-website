import { FileTreeEntry } from '../types/portfolio';
import { FileText, Folder, Code, Mail, Database, Server, Cpu, ScrollText, Github } from 'lucide-react';

const mockFileTree: FileTreeEntry[] = [
  // --- DOCS FOLDER ---
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    icon: Folder,
    language: 'default',
    content: '',
    children: [
      {
        id: 'docs-readme',
        name: 'README.md',
        type: 'file',
        icon: FileText,
        language: 'markdown',
        content: `# Hello! I'm [Your Name].
A Full-Stack Engineer and Infrastructure specialist with a passion for scalable systems and clean code.

### Domains of Interest
- **Backend:** Python, Go, Node.js
- **Frontend:** React, TypeScript, Tailwind
- **Infrastructure:** Kubernetes, Terraform, AWS
`,
      },
      {
        id: 'docs-resume',
        name: 'resume.pdf',
        type: 'file',
        icon: ScrollText,
        language: 'pdf',
        // In a real app, this would be a secure URL to a PDF in S3 or another storage
        content: 'https://placehold.co/800x600/1e293b/d4d4d8?text=Placeholder+for+Resume.pdf',
      },
      {
        id: 'docs-contact',
        name: 'contact.ini',
        type: 'file',
        icon: Mail,
        language: 'ini',
        content: `[Socials]
GitHub = "https://github.com/your-username"
LinkedIn = "https://linkedin.com/in/your-username"
Email = "me@example.com"

[Projects]
Discord-Bot = "https://github.com/your-username/DiscordMarkovBot"
Sample-Work = "https://github.com/your-username/ipynb_samples"
`,
      },
    ],
  },
  // --- BACKEND FOLDER ---
  {
    id: 'backend',
    name: 'backend',
    type: 'folder',
    icon: Server,
    language: 'default',
    content: '',
    children: [
      {
        id: 'backend-py',
        name: '__init__.py',
        type: 'file',
        icon: Code,
        language: 'python',
        content: `# A representation of my Python ecosystem skills.
# 'import' statements represent frameworks/libraries I am proficient in.

import FastAPI
import Django
import Pandas
import NumPy

# 'from projects import' represent internal, proprietary, or personal projects.
from projects import DiscordMarkovBot as Bot
from projects import ipynb_samples as SampleWork

def setup_server():
    """Initializes and runs the core Python application."""
    if Bot.is_active():
        print("Starting Discord Markov Bot...")
    else:
        print("Server setup complete.")
`,
      },
      {
        id: 'backend-ruby',
        name: 'Gemfile',
        type: 'file',
        icon: Code,
        language: 'ruby',
        content: `# My Ruby dependencies and proficiency.
source 'https://rubygems.org' 

gem 'rails', '~> 7.1.3'
gem 'sinatra', '~> 3.0'
gem 'sidekiq', '~> 7.2'
`,
      },
    ],
  },
  // --- INFRA FOLDER ---
  {
    id: 'infra',
    name: 'infra',
    type: 'folder',
    icon: Cpu,
    language: 'default',
    content: '',
    children: [
      {
        id: 'infra-tf',
        name: 'main.tf',
        type: 'file',
        icon: Github,
        language: 'markdown',
        content: `// Terraform (HCL) mock
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "Portfolio-VPC"
  }
}

resource "kubernetes_deployment" "app" {
  metadata {
    name = "portfolio-api"
    labels = {
      app = "go-backend"
    }
  }
  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "go-backend"
      }
    }
  }
}`,
      },
    ],
  },
];

export default mockFileTree;