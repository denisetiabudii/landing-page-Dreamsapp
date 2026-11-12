import DemoFieldError from './DemoFieldError'
import { MAX_TEXT_LENGTH } from '../validation'

// =========================================
// DEMO TEXT FIELD
// Satu komponen untuk semua input teks
// (nama, organisasi, email).
// Gaya: .demo-form__field (di DemoFormField)
// =========================================

function DemoTextField({
  id,
  name,
  label,
  value,
  error,
  onChange,
  sanitize,
  ...inputProps
}) {
  const errorId = `${id}-error`

  const handleChange = (event) => {
    onChange(name, sanitize(event.target.value))
  }

  return (
    <div className="demo-form__field">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={name}
        type="text"
        maxLength={MAX_TEXT_LENGTH}
        value={value ?? ''}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />

      <DemoFieldError id={errorId}>{error}</DemoFieldError>
    </div>
  )
}

export default DemoTextField
