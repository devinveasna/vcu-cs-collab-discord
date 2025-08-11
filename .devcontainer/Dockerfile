# Use Node 20 base image
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:20

# Install additional system deps if needed
RUN apt-get update && apt-get install -y \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Default work directory
WORKDIR /workspace
