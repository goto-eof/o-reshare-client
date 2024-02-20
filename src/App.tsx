import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import FileUploader from './component/FileUploader';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Download from './component/Download';
import Home from './component/Home';
import Nav from './component/Nav';
import Footer from './component/Footer';
import { ApplicationContextProvider } from './component/context/ContextProvider';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <ApplicationContextProvider>
          <Nav />
          <Box p={5} textAlign="center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<FileUploader />} />
              <Route path="/download/:groupId" element={<Download />} />
              <Route path="/download" element={<Download />} />
            </Routes>
          </Box>
          <Footer />
        </ApplicationContextProvider>
      </HashRouter>
    </ChakraProvider>
  );
};
