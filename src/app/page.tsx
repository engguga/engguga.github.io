import { getAllPosts } from '@/lib/mdx'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Blog from '@/components/sections/Blog'
import Books from '@/components/sections/Books'
import Contact from '@/components/sections/Contact'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="border-t border-[#27272a]" />
        <About />
        <div className="border-t border-[#27272a]" />
        <Projects />
        <div className="border-t border-[#27272a]" />
        <Research />
        <div className="border-t border-[#27272a]" />
        <Blog posts={posts} />
        <div className="border-t border-[#27272a]" />
        <Books />
        <div className="border-t border-[#27272a]" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
