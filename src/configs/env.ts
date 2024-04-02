const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  title: import.meta.env.VITE_APP_TITLE ?? 'Commer',
}

export const {
  apiUrl,
  title,
} = env
