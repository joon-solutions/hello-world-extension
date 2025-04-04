/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import React, { useContext, useEffect, useState } from 'react'
import { ComponentsProvider, Space, Text } from '@looker/components'
import { ExtensionContext40 } from '@looker/extension-sdk-react'

/**
 * A simple component that uses the Looker SDK through the extension sdk to display a customized hello message.
 */
export const HelloWorld: React.FC = () => {
  const { coreSDK } = useContext(ExtensionContext40)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getMe = async () => {
      try {
        const responseData = await fetch('https://simple-api-92394149830.asia-southeast1.run.app', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        if (!responseData.ok) {
          const error = await responseData.text()
          throw new Error(`Server responded with ${responseData.status}: ${error}`)
        }
        const responseText = await responseData.text(); 
        setMessage(`Hello, ${responseText}`)
      } catch (error) {
        console.error(error)
        setMessage(`An error occurred while getting information about me! ${error}`)
      }
    }
    getMe()
  }, [coreSDK])

  return (
    <ComponentsProvider
      themeCustomizations={{
        colors: { key: '#1A73E8' },
      }}
    >
      <Space around height="50vh">
        <Text fontSize="xxxxxlarge">{message}</Text>
      </Space>
    </ComponentsProvider>
  )
}
