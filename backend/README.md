# ⚙️ Backend API Service (Go)

## Overview

This service provides a minimal, fast, and secure API layer written in Go. Its primary role is to handle dynamic, non-static data and business logic for the frontend, such as form submissions, rate limiting, and interaction with external data stores.

This API follows RESTful conventions and is designed for low latency and high concurrency. We will be using the **Echo** framework for routing and middleware.

## Tech Stack

|Technology|Purpose|
|---|---|
|**Go (Golang)**|High-performance, concurrent core language|
|**Echo Framework**|High-performance, minimalist Go web framework|
|**Docker**|Containerization for consistent development and deployment|
|**Firestore/PostgreSQL**|Database persistence layer (to be determined based on need)|

## Key Endpoints

|Method|Route|Description|
|---|---|---|
|`GET`|`/api/health`|Service health check|
|`GET`|`/api/projects`|Retrieves list of project metadata|
|`POST`|`/api/contact`|Handles form submission (sends email/saves to DB)|

## Local Development

### 1. Prerequisites

Ensure you have **Go (v1.20+)** installed on your system. We will be using the **Echo** web framework.

### 2. Running the API

Navigate to this directory (`backend/`) and run the main entry file:

```
go run main.go
# Server will typically start on http://localhost:8080

```

### 3. Building the Executable

To create a standalone, optimized binary:

```
go build -o api-server
./api-server

```

## Deployment

The service is designed to be easily containerized. A `Dockerfile` will be included in this directory to create a production image, which can then be deployed to any container orchestration service (e.g., Kubernetes, Cloud Run).