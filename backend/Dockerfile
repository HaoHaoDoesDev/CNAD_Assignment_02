# Stage 1: Build the binary
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /main cmd/api/main.go

# Stage 2: Run the binary
FROM alpine:3.18
WORKDIR /
RUN apk add --no-cache ca-certificates
COPY --from=builder /main /main
# COPY .env .env
EXPOSE 8080
CMD ["/main"]