import Hero from '../components/Hero'

const Home = ({ setCurrentPage }) => {
  return (
    <div>
      <Hero setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Home
