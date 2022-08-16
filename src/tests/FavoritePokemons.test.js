import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritesPokemons from '../pages/FavoritePokemons';

describe('Testes na página FavoritePokemons', () => {
  test('Testa se mensagem é exibida, caso a pessoa não tenha pokémons favoritos', () => {
    render(<FavoritesPokemons />);
    const notFoundMensage = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundMensage).toBeInTheDocument();
  });
  test('Testa se todos os cards de pokémons favoritados são exibidos.', () => {
    render(<FavoritesPokemons />);
    const cards = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(cards).toBeInTheDocument();
  });
});
