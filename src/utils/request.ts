import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export function createService(baseURL: string) {
  const service: AxiosInstance = axios.create({ baseURL })

  service.interceptors.request.use((config) => {
    return config
  })
  
  const request = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return service.get(url, config)
    },

    post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return service.post(url, data, config)
    },

    put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return service.put(url, data, config)
    },

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return service.delete(url, config)
    },
  }
  return request
}
