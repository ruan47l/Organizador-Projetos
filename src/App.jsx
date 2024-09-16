import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/NavBar'
import Container from './components/layout/Container'
import Home from './components/pages/Home'
import Projetos from './components/pages/Projetos'
import NovoProjeto from './components/pages/NovoProjeto'
import Projeto
 from './components/pages/Projeto'
function App() {
  return (
    <Router>
    <Navbar/>
    <Container customClass="min-height">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novoprojeto" element={<NovoProjeto />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projeto/:id" element={<Projeto />} />
      </Routes>
    </Container>
    <Footer/>
  </Router>
  )
}

export default App