// =========================================
// DEMO FIELD ERROR
// Pesan error bersama untuk semua field.
// Gaya: .demo-form__error (di DemoFormField)
// =========================================

function DemoFieldError({ id, children }) {
  if (!children) return null;

  return (
    <span className="demo-form__error" id={id}>
      {children}
    </span>
  );
}

export default DemoFieldError;
