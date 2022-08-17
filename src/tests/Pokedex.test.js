import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes no Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const homeTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(homeTitle).toBeInTheDocument();
  });
  it('Verifica se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado',
    () => {
      const history = createMemoryHistory();
      render(
        <Router history={ history }>
          <App />
        </Router>,
      );
      const nextPokeText = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPokeText).toBeInTheDocument();
      userEvent.click(nextPokeText);
      const secondPoke = screen.getByText(/Charmander/i);
      const secondPokeImg = screen.getByAltText('Charmander sprite');
      expect(secondPoke).toBeInTheDocument();
      expect(secondPokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);
      userEvent.click(nextPokeText);

      const firstPoke = screen.getByText(/Pikachu/i);
      const firstPokeImg = screen.getByAltText('Pikachu sprite');
      expect(firstPoke).toBeInTheDocument();
      expect(firstPokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  it('Verifica se a Pokédex tem os botões de filtro', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const filterLength = 7;
    const filter = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filter).toHaveLength(filterLength);
  });
  it('Verifica se, quando selecionado um tipo, a Pokédex cir'
    + 'cula somente pelos pokémons daquele tipo, e o filtro de resetar ',
  () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const nextPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    const nextPokeTipe = screen.getByRole('button', { name: /psychic/i });
    const allPoke = screen.getByRole('button', { name: /all/i });
    expect(nextPoke).toBeInTheDocument();
    expect(nextPokeTipe).toBeInTheDocument();
    expect(allPoke).toBeInTheDocument();

    userEvent.click(nextPokeTipe);

    const firstPokeTipe = screen.getByText(/alakazam/i);
    const firstPokeTipeImg = screen.getByAltText('Alakazam sprite');
    expect(firstPokeTipe).toBeInTheDocument();
    expect(firstPokeTipeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(allPoke).toBeInTheDocument();

    userEvent.click(nextPoke);

    const secondPokeTipe = screen.getByText(/mew/i);
    const secondPokeTipeImg = screen.getByAltText('Mew sprite');
    expect(secondPokeTipe).toBeInTheDocument();
    expect(secondPokeTipeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');
    expect(allPoke).toBeInTheDocument();

    userEvent.click(nextPoke);

    expect(firstPokeTipe).toBeInTheDocument();
    expect(firstPokeTipeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(allPoke).toBeInTheDocument();

    userEvent.click(allPoke);

    const firstPokeAll = screen.getByText(/pikachu/i);
    const firstPokeAllImg = screen.getByAltText('Pikachu sprite');
    expect(firstPokeAll).toBeInTheDocument();
    expect(firstPokeAllImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(allPoke).toBeInTheDocument();
  });
});
