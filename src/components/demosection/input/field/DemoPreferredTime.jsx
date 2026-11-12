import DemoFieldError from './DemoFieldError'

// =========================================
// DEMO PREFERRED TIME
// =========================================

function DemoPreferredTime({ value, error, onChange }) {
  const handleChange = (event) => {
    onChange('preferredTime', event.target.value)
  }

  return (
    <>
      <style>{`
        .demo-page .demo-form__field select {
          appearance: none;
          width: 100%;
          min-height: 48px;
          padding: 12px 42px 12px 14px;
          color: #747474;
          background-color: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235c5c5c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 13px center;
          background-size: 18px;
          border: 1px solid #c9c9c9;
          border-radius: 8px;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .demo-page .demo-form__field select:hover {
          border-color: #747474;
        }

        .demo-page .demo-form__field select:focus {
          border-color: #0176d3;
          box-shadow: 0 0 0 2px rgba(1, 118, 211, 0.2);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%230176d3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E");
        }

        .demo-page .demo-form__field select.has-value {
          color: #181818;
        }

        .demo-page .demo-form__field select option {
          color: #181818;
          background: #ffffff;
        }

        .demo-page .demo-form__field select[aria-invalid="true"] {
          border-color: #ba0517;
          background-color: #fffafa;
          box-shadow: 0 0 0 1px rgba(186, 5, 23, 0.1);
        }

        @media (max-width: 480px) {
          .demo-page .demo-form__field select {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="demo-form__field">
        <label htmlFor="demo-preferred-time">Waktu Demo yang Diinginkan</label>

        <select
          className={value ? 'has-value' : ''}
          id="demo-preferred-time"
          name="preferredTime"
          required
          value={value}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'demo-preferred-time-error' : undefined}
        >
          <option value="">Pilih waktu yang diinginkan</option>

          <option value="Fleksibel">Fleksibel</option>
          <option value="Pagi">Pagi</option>
          <option value="Siang">Siang</option>
          <option value="Sore">Sore</option>
        </select>

        <DemoFieldError id="demo-preferred-time-error">{error}</DemoFieldError>
      </div>
    </>
  )
}

export default DemoPreferredTime
