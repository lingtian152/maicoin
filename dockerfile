# 使用官方的 Node.js 镜像作为基础镜像
FROM node:node:18.20-bookworm-slim

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install



# 构建项目
RUN npm run build

# 启动应用
CMD ["npm", "start"]