import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testes na página NotFound', () => {
  test('Testa se a página, possui o texto Page requested not found', () => {
    render(<NotFound />);
    const notFoundMensage = screen
      .getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundMensage).toBeInTheDocument();
  });
  test('Testa se a página possui uma imagem', () => {
    render(<NotFound />);
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
