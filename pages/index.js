import Head from 'next/head'
import CinematicPortfolio from '../components/cinematic/CinematicPortfolio'
import CONFIG from '../components/cinematic/config'

export default function Home() {
  const title = `${CONFIG.name.first} ${CONFIG.name.last} — ${CONFIG.role}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={CONFIG.about.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <CinematicPortfolio />
    </>
  )
}
