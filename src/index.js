import TF from './TF'

// dont override global variable
if (typeof window !== 'undefined' && typeof window.TF === 'undefined') {
  window.TF = TF
}

export default TF
