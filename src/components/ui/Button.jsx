export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled = false, onClick, type = 'button' }) {
  const basis = 'inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed'

  const varianten = {
    primary: 'bg-brand-yellow hover:bg-brand-yellow-dark text-text-dark focus:ring-brand-yellow',
    secondary: 'border-2 border-brand-yellow bg-white hover:bg-brand-yellow text-text-dark focus:ring-brand-yellow',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
    danger: 'bg-brand-red hover:bg-red-700 text-white focus:ring-red-400',
    green: 'bg-brand-green hover:bg-brand-green-dark text-white focus:ring-green-400',
  }

  const groessen = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${basis} ${varianten[variant]} ${groessen[size]} ${className}`}
    >
      {children}
    </button>
  )
}
