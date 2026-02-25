export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      success: 'emerald',
      error: 'red',
    },
    input: {
      variants: {
        size: {
          default: {
            base: 'h-14 pl-11 rounded-lg font-medium',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5',
          },
          costum: {
            base: 'h-10 pl-11 rounded-md',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5',
          },
          normal: {
            base: 'h-12 pl-11 rounded-lg font-medium',
            leading: 'ps-4',
            trailing: 'pe-4',
            leadingIcon: 'size-5',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-4',
          },
        },
      },
    },
    button: {
      variants: {
        size: {
          default: {
            base: 'h-13 cursor-pointer rounded-lg font-semibold flex items-center justify-center gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5',
          },
        },
      },
    },
    select: {
      variants: {
        size: {
          normal: {
            base: 'h-12 pl-11 rounded-xl font-medium',
            leading: 'ps-4',
            trailing: 'pe-4',
            leadingIcon: 'size-5',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-4',
            item: 'p-3 cursor-pointer',
          },
        },
      },
    },
    navigationMenu: {
      slots: {
        link: 'mt-2 hover:bg-primary-50 rounded-xl',
        linkLeadingIcon: 'text-primary-700!',
        linkTrailingIcon: 'text-primary-700',
        childLinkIcon: 'size-10',
        linkLabelExternalIcon: 'text-primary-700',
        childLinkWrapper: 'text-primary-700',
        linkLabel: 'text-primary-700 font-normal',
        linkTrailing: 'text-primary-700',
        root: 'mt-6',
      },
    },
    modal: {
      slots: {
        overlay: 'bg-black/30 backdrop-blur-sm',
      },
    },
    fileUpload: {
      variants: {
        size: {
          normal: {
            base: 'h-12 pl-11 rounded-xl font-medium',
            leading: 'ps-4',
            trailing: 'pe-4',
            leadingIcon: 'size-20',
            icon: 'w-8 h-8',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-20',
          },
        },
      },
    },
    pinInput: {
      variants: {
        size: {
          default: {
            base: 'h-13.5 w-13.5 rounded-2xl font-medium',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5',
          },
        },
      },
    },
  },
})
