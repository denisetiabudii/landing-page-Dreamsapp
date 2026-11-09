import DemoTextField from "./DemoTextField";
import { sanitizeOrganization } from "../validation";

function DemoOrganization(props) {
  return (
    <DemoTextField
      {...props}
      id="demo-organization"
      name="organization"
      label="Nama Lembaga / Organisasi"
      autoComplete="organization"
      placeholder="Masukkan nama lembaga atau organisasi"
      sanitize={sanitizeOrganization}
    />
  );
}

export default DemoOrganization;
