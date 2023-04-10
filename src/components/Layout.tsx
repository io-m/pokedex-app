import Head from 'next/head'
import React from 'react'

export const Layout = (props: any) => {
  
  return (
    <div className='bg-[#FAFAFA]'>
        <Head>
            <title>{ props.title } </title>
            <link rel="icon" href="favicon.ico" />
        </Head>
        <main>
            { props.children }
        </main>
    </div>
  )
}
