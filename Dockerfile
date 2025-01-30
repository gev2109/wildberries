# Используем официальный образ Node.js
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем проект (если нужно, например, для TypeScript)
# RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем сервер
CMD ["node", "src/index.js"]
