import DemoTextField from "./DemoTextField";
import { sanitizeEmail } from "../validation";

function DemoEmail(props) {
  return (
    <DemoTextField
      {...props}
      id="demo-email"
      name="email"
      label="Email"
      type="email"
      inputMode="email"
      autoComplete="email"
      autoCapitalize="none"
      spellCheck={false}
      placeholder="nama@lembaga.com"
      sanitize={sanitizeEmail}
    />
  );
}

export default DemoEmail;
