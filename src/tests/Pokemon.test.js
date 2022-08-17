import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../RWR';
import { Pokemon } from '../components';

const pokemonsX = pokemons[0];

describe('Testes no componente Pokemon', () => {
  it('Verifica se a aplicação possui um conjunto fixo de links de navegação', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonsX } isFavorite />);
    const pokeName = screen.getByText(pokemonsX.name);
    const pokeType = screen.getByText(pokemonsX.type);
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const pokeSprite = screen.getByAltText('Pikachu sprite');
    const detailsLink = screen.getByRole('link', { name: /more details/i });

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(detailsLink).toBeInTheDocument();
  });
  it('Verifica se ao clicar em more details é redireciona a respectiva página', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemonsX } isFavorite />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const detailspage = history.location.pathname;
    expect(detailspage).toBe('/pokemons/25');
  });
  it('Verifica se existe uma imagem(favorito) na página de detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonsX } isFavorite />);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
