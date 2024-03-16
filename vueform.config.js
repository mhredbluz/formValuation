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
    removeFile: {
      url: 'https://zc0okg91g2.execute-api.sa-east-1.amazonaws.com/api/remove',
      method: 'POST',
    },
    submit: {
      url: 'https://zc0okg91g2.execute-api.sa-east-1.amazonaws.com/api/submit',
      method: 'POST',
    }
  },
})