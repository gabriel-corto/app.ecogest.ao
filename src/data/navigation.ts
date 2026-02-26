import type { SidebarItems } from '@/types/components'

export const navigationItems = ref<SidebarItems[]>([
  {
    activeClass: 'bg-primary-50',
    label: 'Navegação',
    type: 'label',
    icon: 'i-hugeicons-navigation-04',
    context: ['ADMIN', 'COMPANY'],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Visão Geral',
    defaultOpen: true,
    icon: 'i-hugeicons-grid-view',
    context: ['COMPANY'],
    to: '/entities',
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Gestão de Projectos',
    defaultOpen: true,
    icon: 'i-hugeicons-align-bottom',
    context: ['COMPANY'],
    children: [
      {
        label: 'Meus Projectos',
        icon: 'i-hugeicons-apartment',
        to: '/entities/projects',
      },
      {
        label: 'Cadastrar Projectos',
        icon: 'i-hugeicons-add-invoice',
      },
    ],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Gestão de Processos',
    defaultOpen: true,
    icon: 'i-hugeicons-hierarchy-files',
    context: ['COMPANY'],
    children: [
      {
        label: 'Processos Pendentes',
        icon: 'i-hugeicons-files-01',
        to: '/entities/processings',
      },
      {
        label: 'Processos Emitidos',
        icon: 'i-hugeicons-files-02',
        to: '/entities/processes',
      },
    ],
  },
  {
    activeClass: 'bg-primary-50',
    label: 'Gestão do Sistema',
    defaultOpen: true,
    icon: 'lucide:shield-user',
    context: ['ADMIN'],
    to: '/admin',
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
