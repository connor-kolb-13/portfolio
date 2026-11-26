import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Approach from '../components/Approach'
import Community from '../components/Community'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Work from '../components/Work'
import { profile } from '../content'

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name} · ${profile.role}`
  }, [])
  return (
    <motion.main id="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <Hero />
      <Work />
      <Approach />
      <Experience />
      <Community />
      <Contact />
    </motion.main>
  )
}
