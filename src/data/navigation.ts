import type { SidebarItems } from '@/types/components'

export const navigationItems = ref<SidebarItems[]>([
  {
    activeClass: 'bg-primary-50',
    label: 'Dashboard',
    type: 'label',
    icon: 'i-hugeicons-dashboard-square-02',
    context: ['ADMIN', 'COMPANY'],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Gestão Ambiental',
    defaultOpen: true,
    icon: 'i-hugeicons-align-bottom',
    context: ['COMPANY'],
    children: [
      {
        label: 'Meus Projectos',
        icon: 'i-hugeicons-folder-01',
        to: '/entities/projects',
      },
      {
        label: 'Minhas Licenças',
        icon: 'i-hugeicons-file-badge',
        to: '/entities/licenses',
      },
    ],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Gestão de Licenças',
    defaultOpen: true,
    icon: 'i-hugeicons-hierarchy-files',
    context: ['ADMIN'],
    children: [
      {
        label: 'Licenças Pendentes',
        icon: 'i-hugeicons-files-01',
        to: '/admin/pending',
      },
      {
        label: 'Licenças Emitidas',
        icon: 'i-hugeicons-files-02',
        to: '/admin/issued',
      },
    ],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Controle de Acessos',
    icon: 'i-hugeicons-manager',
    defaultOpen: true,
    context: ['ADMIN'],
    children: [
      {
        label: 'Gestão de entidades',
        icon: 'i-hugeicons-user-list',
        to: '/admin/entities',
      },
      {
        label: 'Gestão de administradores',
        icon: 'i-hugeicons-account-setting-01',
        to: '/admin/administrators',
      },
    ],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Auditoria',
    icon: 'i-hugeicons-server-stack-01',
    defaultOpen: true,
    context: ['ADMIN'],
    children: [
      {
        label: 'Logs de Fiscalização',
        icon: 'i-hugeicons-fingerprint-scan',
        to: '/admin/audit',
      },
    ],
  },
])
