import Gallery from '../components/Gallery'

const GalleryPage = ({ initialSection = 'photos' }) => {
  return (
    <Gallery initialSection={initialSection} />
  )
}

export default GalleryPage
