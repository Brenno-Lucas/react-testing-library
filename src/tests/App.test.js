import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes no App', () => {
  it('Verifica se a aplicação possui um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const homeTitle = screen.getByRole('link', { name: /Home/i });
    const aboutTitle = screen.getByRole('link', { name: /About/i });
    const favoriteTitle = screen.getByRole('link', { name: /Favorite/i });
    expect(homeTitle).toBeInTheDocument();
    expect(aboutTitle).toBeInTheDocument();
    expect(favoriteTitle).toBeInTheDocument();
  });
  it('Verifica se a aplicação é redirecionada para página inicial', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const homepag = history.location.pathname;
    expect(homepag).toBe('/');
  });
  it('Verifica se a aplicação é redirecionada para página About', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const aboutpag = history.location.pathname;
    expect(aboutpag).toBe('/about');
  });
  it('Verifica se a aplicação é redirecionada para página Favorites', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const Favorites = screen.getByRole('link', { name: /Favorite/i });
    expect(Favorites).toBeInTheDocument();
    userEvent.click(Favorites);
    const Favoritespag = history.location.pathname;
    expect(Favoritespag).toBe('/favorites');
  });
  it('Verifica se a aplicação é redirecionada para /notFound se a url não for encontrada',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      history.push('/null');
      const notfound = screen.getByRole('heading',
        { name: /Page requested not found/i });
      expect(notfound).toBeInTheDocument();
    });
});
