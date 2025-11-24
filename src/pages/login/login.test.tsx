// login.test.tsx - VERSIÓN FINAL FUNCIONAL
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

// Mocks simples que SÍ funcionan
vi.mock('../../utils/handle-request-thunk', () => ({
  handleRequestThunk: vi.fn(),
}))

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../../services/localstorage', () => ({
  localStorageService: {
    decode: vi.fn(() => ({ isAdmin: false })),
    getToken: vi.fn(() => ''),
  }
}))

import Login from './login.page'

describe('Login - Pruebas Unitarias', () => {
  it('renderiza los campos del formulario', () => {
    render(<Login />)
    expect(screen.getByPlaceholderText(/ingresa tu correo o usuario/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/ingresa tu contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeInTheDocument()
  })

  it('permite escribir en los campos', async () => {
    const user = userEvent.setup()
    render(<Login />)

    await user.type(screen.getByPlaceholderText(/ingresa tu correo o usuario/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/ingresa tu contraseña/i), 'mipassword123')

    expect(screen.getByPlaceholderText(/ingresa tu correo o usuario/i)).toHaveValue('test@example.com')
    expect(screen.getByPlaceholderText(/ingresa tu contraseña/i)).toHaveValue('mipassword123')
  })
 
})