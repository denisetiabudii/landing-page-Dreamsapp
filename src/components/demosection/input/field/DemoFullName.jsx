import DemoTextField from './DemoTextField'
import { sanitizeFullName } from '../validation'

function DemoFullName(props) {
  return (
    <DemoTextField
      {...props}
      id="demo-full-name"
      name="fullName"
      label="Nama Lengkap"
      autoComplete="name"
      placeholder="Masukkan nama lengkap Anda"
      sanitize={sanitizeFullName}
    />
  )
}

export default DemoFullName
