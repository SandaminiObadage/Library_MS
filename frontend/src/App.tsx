import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Book } from './types/Book';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const handleAddBook = () => {
    setEditingBook(undefined);
    setShowForm(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setRefreshList(true);
  };

  const handleRefreshComplete = () => {
    setRefreshList(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(undefined);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        
        <main className="content-wrapper">
          <HeroSection onAddBook={handleAddBook} />
          
          <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <BookList
              onEdit={handleEditBook}
              onAdd={handleAddBook}
              refresh={refreshList}
              onRefreshComplete={handleRefreshComplete}
            />
          </div>
        </main>
        
        <Footer />
        
        <BookForm
          show={showForm}
          onHide={handleFormClose}
          book={editingBook}
          onSuccess={handleFormSuccess}
        />
      </div>
    </AuthProvider>
  );
};

export default App;
