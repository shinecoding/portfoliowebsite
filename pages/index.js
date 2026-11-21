import Head from 'next/head'
import CinematicPortfolio from '../components/cinematic/CinematicPortfolio'
import CONFIG from '../components/cinematic/config'

export default function Home() {
  const title = `${CONFIG.name.first} ${CONFIG.name.last} — ${CONFIG.role}`
  const { description, image } = CONFIG.share
  const imageUrl = `${CONFIG.siteUrl}${image}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={CONFIG.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={`${CONFIG.name.first} ${CONFIG.name.last}`} />
        <meta property="og:url" content={CONFIG.siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Christy Choi, software engineer in London, open to new opportunities" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <CinematicPortfolio />
    </>
  )
}
