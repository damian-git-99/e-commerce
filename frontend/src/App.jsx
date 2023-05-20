import React from 'react';
import { Container } from 'react-bootstrap';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
  return (
      <>
        <Header />
        <main className="py-3">
          <Container>
            <AppRoutes />
          </Container>
        </main>
      <Footer />
      </>
  );
};

export default App;
