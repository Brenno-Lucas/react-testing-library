import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testes na pagina About', () => {
  test('Testa se a página possui informações sobre a Pokédex', () => {
    render(<About />);
    const descriptionOne = screen.getByText(/This application simulates a Pokédex/i);
    const descriptionTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(descriptionOne).toBeInTheDocument();
    expect(descriptionTwo).toBeInTheDocument();
  });
  test('Testa se a página possui um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutH2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutH2).toBeInTheDocument();
  });
  test('Testa se a página possui uma imagem de uma Pokédex:', () => {
    render(<About />);
    const aboutImage = screen.getByAltText('Pokédex');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  }); // Testar imagem: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
});
