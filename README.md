# 05-notehub

Застосунок NoteHub для роботи з персональною колекцією нотаток. Користувач
бачить список своїх нотаток, може шукати їх за ключовим словом, перемикати
сторінки колекції, створювати нові нотатки через форму в модальному вікні та
видаляти наявні. Дані зберігаються на бекенді
[NoteHub API](https://notehub-public.goit.study/api/docs).

## Стек

- React + TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- Formik + Yup
- React Paginate
- use-debounce
- React Hot Toast
- CSS Modules
- modern-normalize
- Prettier

## Структура

```
src/
├── components/
│   ├── App/
│   ├── EmptyState/
│   ├── ErrorMessage/
│   ├── Loader/
│   ├── Modal/
│   ├── NoteForm/
│   ├── NoteList/
│   ├── Pagination/
│   └── SearchBox/
├── services/
│   └── noteService.ts
├── types/
│   └── note.ts
└── main.tsx
```

## Змінні оточення

Для запитів до бекенда потрібен персональний токен доступу. Його можна
отримати в [документації бекенда](https://notehub-public.goit.study/api/docs)
(маршрут `POST /auth`). Створіть у корені проєкту файл `.env` (за зразком
`.env.example`):

```
VITE_NOTEHUB_TOKEN=your_notehub_access_token
```

## Запуск

```bash
npm install
npm run dev
```

## Скрипти

- `npm run dev` — dev-сервер
- `npm run build` — перевірка типів і production-збірка
- `npm run preview` — перегляд збірки
- `npm run lint` — лінтинг
- `npm run format` — форматування коду через Prettier
