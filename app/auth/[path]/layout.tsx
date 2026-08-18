import Header from '@/components/shadcn-space/blocks/topbar-04/header';
import React, { ReactNode } from 'react'

function layout({children}: {children: ReactNode}) {
  return (
    <div>
        <Header />
      {children}
    </div>
  )
}

export default layout
