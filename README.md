# Тестовый проект herb.tproject

Деплой демонстрационного проекта: https://brilliant-starship-1c7d68.netlify.app/

Демонстрация работы

https://github.com/user-attachments/assets/112a94df-3838-46a9-80ba-6758a89c0f5e


Проект демонстрирует процесс авторизации в системе по следующему алгоритму:

1. При аутентификации пользователя генерируются access_token и refresh_token
2. После окончания действия access_token выполняется метод на обновление токена

Особенности:

1. access_token действителен 5 мин, refresh_token - неделю
2. Для запросов, нуждающихся в авторизации, передается хедер `Bearer {токен}`

## Технологии:

- Nuxt v.3
- TypeScript

## API

- /api/token/ - POST
- /api/token/refresh/ - POST
- /api/logout/ - GET (!), нужны данные авторизации
- /api/favorites/ - GET, нужны данные авторизации

## Запуск проекта

Для того чтобы локально запустить проект, необходимо склонировать его на локальную машину командой

`git clone https://github.com/divnvp/herb-tproject.git`

После чего, находясь в папке herb-tproject, запустить в следующем порядке команды

`npm install`

`npm run dev`

Проект будет доступен на http://localhost:3000/
