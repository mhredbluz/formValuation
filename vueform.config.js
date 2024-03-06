import pt_BR from '@vueform/vueform/locales/pt_BR'
import tailwind from '@vueform/vueform/themes/tailwind'
import { defineConfig } from '@vueform/vueform'

export default defineConfig({
  theme: tailwind,
  locales: { pt_BR },
  locale: 'pt_BR',
  endpoints: {
    uploadTempFile: {
      url: 'https://zc0okg91g2.execute-api.sa-east-1.amazonaws.com/v1/files',
      method: 'POST',
    },
    removeTempFile: {
      url: 'https://ccaa-2804-7f0-96c3-8024-9508-7264-6f51-9ce8.ngrok-free.app/api/remove',
      method: 'POST',
    },
    removeFile: {
      url: 'https://ccaa-2804-7f0-96c3-8024-9508-7264-6f51-9ce8.ngrok-free.app/api/remove',
      method: 'POST',
    },
    submit: {
      url: 'https://zc0okg91g2.execute-api.sa-east-1.amazonaws.com/api/submit',
      method: 'POST',
    }
  },
})
