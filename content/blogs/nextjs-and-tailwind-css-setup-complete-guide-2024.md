---
title: Next.js and Tailwind CSS Setup Complete Guide (2024)
date: 2024-03-11
description: A step-by-step guide to installing and configuring Tailwind CSS with Next.js, plus building a production-optimized project that fetches and displays Dev.to articles.
tags: [Next.js, Tailwind CSS, JavaScript, React]
coverImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1699371571633/e884242a-e312-4ae1-9f3e-7127db73a576.jpeg
readingTime: 8
---

Tailwind CSS is a CSS framework that helps to rapidly develop a modern website with ease. Today in the current Developer market a Developer with Tailwind CSS can develop Websites with custom elements faster when compared with Bootstrap. Developers prefer Tailwind CSS over other CSS frameworks due to many reasons, Some of which are listed below:-

* Native Classes of CSS
* Tailwind only ships the useful CSS classes to production ( unlike the bloated Bootstrap ).
* Custom Elements without any extra work for CSS

Next.js is a React Framework that allows a developer to build and deploy websites with Optimized Production build with React Features without compromising the speed of a React Website.

Today in this article we'll discuss how to set up and install Next.js with Tailwind CSS and build a Production and Optimized Build for our Test Website.

## Tailwind CSS

Tailwind CSS is a utility-first framework that allows a Developer to build and Develop a Production build of a website with no unused CSS which can slow up our Website's performance.

### Install Tailwind CSS in Next.js

To Install Tailwind CSS in a Next.js project you must first create a Next.js project and then configure Tailwind CSS.

#### Create a Next.js Project

To create a Next.js Project you have to execute a single command with optional parameters ( if suited ).

```bash
npx create-next-app demoNextProject --eslint
```

From the above command, we'll get a Next.js project setup with the default arguments.

##### Next.js with TypeScript enabled

TypeScript is a Modern Tech Stack that allows a developer to identify bugs and issues at the time of Development only. It extends the Native JavaScript and improves the Developer Experience by adding features like Interfaces, aliases, and function overloading.

To enable TypeScript in a Next.js project you've to provide an additional parameter termed `--typescript`.

```bash
npx create-next-app demoNextProject --typescript --eslint
```

#### Install Tailwind CSS in the Next.js Project

Installing Tailwind CSS is just like another npm package you use to install most of the time, the main thing is to configure the Tailwind to work with the Next.js Project.

##### Install Tailwind CSS

To Install Tailwind CSS just execute this command and this will Install Tailwind CSS to your project.

Along with the Tailwind CSS, you've to install two additional packages named `postcss` and `autoprefixer`. These packages will constantly watch your HTML and JS files and update the CSS file for you.

```bash
npm install -D tailwindcss postcss autoprefixer
```

with this command, you can now easily install all the required packages and use the selected packages but the configuration of the Files and Packages is still to be done.

##### Configure Tailwind CSS

Configuring Tailwind CSS is not as tough as installing the packages it's just executing a command and done with everything.

To get started try executing this command

```bash
npx tailwindcss init -p
```

After executing this command One file should be created at the root of the Project named `tailwind.config.js`.

Add these additional lines to the file

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Alternatively, you can also write a single `*` instead of all the additional lines that we wrote.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

this will allow the Tailwind packages to look in every file of the Project for any Tailwind-related changes and update the same in the CSS file for you.

##### Final Configuration of Tailwind CSS

Finally, we're at the end of our Configuration part with just one copy-paste to the main CSS file which is already provided by the Next.js default template.

under `globals.css` removes everything and simply replaces this code provided below with everything in there.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Project time

Let's try to implement all these steps in a real-time project that fetches Articles from Dev.to the platform and displays them on the front end.

### Create a Next.js Project

This time we'll not opt for TypeScript due to low usage of the Project as this is just a small Project.

```plaintext
npx create-next-app devArticles
```

*Note:- Next.js project names cannot be in capitals ( if any ).*

![Next.js project scaffold](https://cdn.hashnode.com/res/hashnode/image/upload/v1699371486506/45caf668-4b91-425f-a40e-8963ca8c344f.png)

### Install Tailwind CSS in the Project

To Install Tailwind CSS in Next.js all you've to do is execute this command.

```bash
npm install -D tailwindcss postcss autoprefixer
```

this will install all the packages that are required to use Tailwind CSS for our Project.

### Configure Tailwind CSS

To configure Tailwind CSS you've to first execute a command that'll generate *if not already present* and insert some useful code to get up and running your code

```bash
npx tailwindcss init -p
```

now we'll edit the code to watch our file with whatever file type we're using like we're not using TypeScript so we'll configure it to watch only JavaScript Files that are present under the **pages** directory.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

now as We've already done all the hard parts, we just now have to replace the pre-defined CSS written in `globals.css` with the below-given code

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Using Tailwind CSS

As we've already done all the dirty work with the installing and configuring, we're good to use it as we please.

Currently, my project structure looks like this

![Project structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1699371507156/a07b81bc-5f5e-4cbd-94c2-072b19191919.png)

Now we've to write HTML first to hydrate Static Content on our web page.

```js
export default function Home() {
  return (
    <div>
      <h1>Articles Published by User on Dev.to</h1>
      <p>Dev.to is a Blogging Platform developed by Forem on Ruby on Rails for Developers.</p>
      <button>Article Number 1</button>
      <button>Article Number 1</button>
      <button>Article Number 1</button>
    </div>
  )
}
```

Bare-bone HTML doesn't look good, yet it powers the complete Web Development Industry.

Let's add our magic using Tailwind CSS *( and when I say magic I mean it, I don't even know how to write good CSS, still Tailwind will still allow me to do everything )*.

Before applying Tailwind CSS to our Project, our Website looks something like this

![Plain HTML](https://cdn.hashnode.com/res/hashnode/image/upload/v1699371521927/dc68a135-3683-490e-b5c5-3b425ad25c91.png)

Well, we also added a custom `_document.jsx` to control the background color and other parts of the page.

```js
import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head />
    <body className="bg-black text-gray-300">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
```

CSS can be tough to write sometimes but when it's with Tailwind CSS, it's really easy to write CSS, and that too with responsiveness.

After writing the Code for our Page it looks something like this

![Styled with Tailwind](https://cdn.hashnode.com/res/hashnode/image/upload/v1699371540316/d8e754b4-1ae9-4c37-91f0-e02574860b41.png)

with minimum to less touch on CSS, The code given below

```js
import Link from 'next/link'

export default function Home({ response }) {
  return (
    <div>
      <h1 className="w-screen text-center text-4xl font-bold 2xl:mt-24">
        Articles Published by{' '}
        <span className="underline hover:animate-ping">{response[0].user.name}</span> on Dev.to
      </h1>
      <p className="lg: sm: md: xl: w-screen text-center 2xl:mt-6">
        Dev.to is a Blogging Platform developed by Forem on Ruby on Rails for Developers.
      </p>
      <div>
        <div className=" grid grid-cols-2">
          {response.map((article) => {
            return (
              <button className="m-4 mt-8 w-10/12 rounded-md bg-gray-600 p-4 duration-300 hover:bg-slate-400 hover:text-black">
                <Link href={article.url} passHref target={'_blank'}>
                  {article.title}
                </Link>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let response = await (await fetch('https://dev.to/api/articles?username=coderaman7')).json()

  return {
    props: {
      response: response,
    },
  }
}
```

with the less amount of CSS that Tailwind is offering, it offers maximum productivity, and yet it doesn't bloat your App.

## Conclusion

In this article. we saw how we can develop our Web App with Tailwind CSS with absolutely no CSS touched and still, our Designs can look modern and responsive.

You can access all the code from our Playground made available for you ( which will help you to test everything without even installing anything on your system ), to access the code [Click here](https://codedamn.com/playground/iYlXPa_ZEq_eRJlGS7fZk).

Be sure to check out the [Official Documentation](https://tailwindcss.com/docs/guides/nextjs) for further info, to get all the detailed information in a concise form you can refer to our [YouTube Channel](https://www.youtube.com/@codedamn), or refer to our [Blogs](https://codedamn.com/blogs) to stay Updated with other tools as well.

Hope this article has helped you.

Thanks for Reading
Happy Hacking