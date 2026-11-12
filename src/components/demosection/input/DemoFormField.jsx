import DemoFullName from './field/DemoFullName'
import DemoOrganization from './field/DemoOrganization'
import DemoEmail from './field/DemoEmail'
import DemoPhone from './field/DemoPhone'
import DemoPreferredTime from './field/DemoPreferredTime'

// =========================================
// DEMO FORM FIELD — ROUTING
// =========================================

function renderField({ name, value, error, onChange, onValidityChange }) {
  const fieldProps = {
    value,
    error,
    onChange,
  }

  switch (name) {
    case 'fullName':
      return <DemoFullName {...fieldProps} />

    case 'organization':
      return <DemoOrganization {...fieldProps} />

    case 'email':
      return <DemoEmail {...fieldProps} />

    case 'phone':
      return <DemoPhone {...fieldProps} onValidityChange={onValidityChange} />

    case 'preferredTime':
      return <DemoPreferredTime {...fieldProps} />

    default:
      return null
  }
}

// =========================================
// DEMO FORM FIELD
// =========================================

function DemoFormField(props) {
  const field = renderField(props)

  if (!field) return null

  return (
    <>
      <style>{`
        .demo-page .demo-form__field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 8px;
        }

        .demo-page .demo-form__field label {
          color: #181818;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
        }

        .demo-page .demo-form__field input {
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          box-sizing: border-box;
          color: #181818;
          background: #ffffff;
          border: 1px solid #c9c9c9;
          border-radius: 8px;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .demo-page .demo-form__field input::placeholder {
          color: #747474;
        }

        .demo-page .demo-form__field input:hover {
          border-color: #747474;
        }

        .demo-page .demo-form__field input:focus {
          border-color: #0176d3;
          box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.2);
        }

        .demo-page .demo-form__field input[aria-invalid="true"] {
          border-color: #ba0517;
          background-color: #fffafa;
          box-shadow: 0 0 0 1px rgba(186, 5, 23, 0.1);
        }

        .demo-page .demo-form__field input[aria-invalid="true"]:focus {
          border-color: #ba0517;
          box-shadow: 0 0 0 2px rgba(186, 5, 23, 0.2);
        }

        .demo-page .demo-form__error {
          color: #ba0517;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 480px) {
          .demo-page .demo-form__field label {
            font-size: 12px;
          }

          .demo-page .demo-form__field input {
            font-size: 13px;
          }
        }
      `}</style>

      {field}
    </>
  )
}

export default DemoFormField
