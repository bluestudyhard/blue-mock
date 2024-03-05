export interface MenuList {
  icon: string
  title: string
  action: (...args: any[]) => void
  isActive?: () => boolean
  type?: string
}
