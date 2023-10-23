## bug

#### Radix - Font-family

##### 1. in RootLayout(layout.tsx)

```javascript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

<html lang="en" className={inter.variable}>
      <body>
        ...
      </body>
    </html>

```

##### 2. in tailwind.config.js

```javascript
theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
```

#### SimplemMDE Problems with server-side rendering. Navigator is not defined

Solution:
https://github.com/RIP21/react-simplemde-editor/issues/30

```javascript
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})
```
