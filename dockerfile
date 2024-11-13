# 第一阶段：Node.js 构建阶段
FROM node:22.10.0-slim

# 设置工作目录
WORKDIR /app

# 安装依赖
RUN yarn install


# 启动应用
CMD ["yarn", "start"]