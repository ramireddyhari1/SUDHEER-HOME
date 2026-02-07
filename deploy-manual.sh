#!/bin/bash

# Manual deployment script for SUDHEER-HOME
# Run this with: bash deploy-manual.sh

echo "🚀 Starting deployment to server..."

# SSH into server and deploy
ssh root@165.232.176.157 << 'ENDSSH'
cd /var/www/SUDHEER-HOME
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

echo "📥 Pulling latest changes..."
git pull

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart all

echo "✅ Deployment complete!"
ENDSSH

echo "🎉 Done!"
