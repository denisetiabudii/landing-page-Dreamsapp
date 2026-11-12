import { useRef, useState } from 'react'

import DemoFormField from './input/DemoFormField'
import DemoFormHeading from './input/DemoFormHeading'
import DemoSubmitButton from './input/DemoSubmitButton'
import DemoFormStatus from './input/DemoFormStatus'

import {
  validateFullName,
  validateOrganization,
  validateEmail,
  validatePhone,
  validatePreferredTime,
} from './input/validation'

// =========================================
// INITIAL FORM VALUES
// =========================================

const initialFormValues = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  preferredTime: '',
}

// =========================================
// DEMO INPUT
// =========================================

function DemoInput() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [whatsappState, setWhatsappState] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneIsValid, setPhoneIsValid] = useState(false)

  // Nomor terbaru, agar callback validitas tidak membaca nilai lama
  const latestPhoneRef = useRef('')

  const clearPhoneError = () =>
    setErrors((previousErrors) => ({
      ...previousErrors,
      phone: '',
    }))

  // =========================================
  // VALIDATION
  // =========================================

  const validateForm = (values, isValidPhone) => ({
    fullName: validateFullName(values.fullName),
    organization: validateOrganization(values.organization),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone, isValidPhone),
    preferredTime: validatePreferredTime(values.preferredTime),
  })

  const formErrors = validateForm(formValues, phoneIsValid)

  const isFormValid = Object.values(formErrors).every((error) => !error)

  // =========================================
  // UPDATE FIELD
  // =========================================

  const updateField = (name, value) => {
    const updatedValues = {
      ...formValues,
      [name]: value,
    }

    if (name === 'phone') {
      latestPhoneRef.current = value
    }

    setFormValues(updatedValues)

    // Abaikan reset otomatis nomor setelah pengajuan berhasil
    const isPhoneResetAfterSuccess =
      whatsappState?.status === 'success' && name === 'phone' && value === ''

    if (isPhoneResetAfterSuccess) {
      clearPhoneError()
      return
    }

    const updatedErrors = validateForm(updatedValues, phoneIsValid)

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: updatedErrors[name],
    }))

    setWhatsappState(null)
  }

  // =========================================
  // UPDATE PHONE VALIDITY
  // =========================================

  const updatePhoneValidity = (isValid) => {
    setPhoneIsValid(isValid)

    // Abaikan status tidak valid otomatis setelah pengajuan berhasil
    if (whatsappState?.status === 'success' && !isValid) {
      clearPhoneError()
      return
    }

    setErrors((previousErrors) => ({
      ...previousErrors,
      phone: validatePhone(latestPhoneRef.current, isValid),
    }))
  }

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    const currentErrors = validateForm(formValues, phoneIsValid)

    setErrors(currentErrors)
    setWhatsappState(null)

    if (Object.values(currentErrors).some(Boolean) || isSubmitting) {
      return
    }

    const payload = {
      name: formValues.fullName.trim(),
      organization: formValues.organization.trim(),
      email: formValues.email.trim(),
      whatsapp: formValues.phone,
      preferred_time: formValues.preferredTime,
    }

    // =========================================
    // WHATSAPP MESSAGE
    // =========================================

    const message = [
      'Halo tim DREAMS, saya ingin mengajukan jadwal demo aplikasi DREAMS.',
      '',
      `Nama: ${payload.name}`,
      `Lembaga/Organisasi: ${payload.organization}`,
      `Email: ${payload.email}`,
      `Nomor WhatsApp: ${payload.whatsapp}`,
      `Waktu demo yang diinginkan: ${payload.preferred_time}`,
      '',
      'Mohon informasi lebih lanjut mengenai jadwal demo. Terima kasih.',
    ].join('\n')

    // =========================================
    // API SUBMISSION
    // =========================================

    setIsSubmitting(true)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

      if (!apiBaseUrl) {
        throw new Error(
          'Konfigurasi API belum tersedia. Silakan hubungi tim DREAMS.',
        )
      }

      const response = await fetch(`${apiBaseUrl}/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error?.message ??
            'Pengajuan belum berhasil disimpan. Silakan coba lagi.',
        )
      }

      // Link WhatsApp hanya diberikan server setelah pengajuan berhasil,
      // sehingga nomor tidak ada di bundle frontend. Hanya link wa.me yang
      // diterima; jika tidak ada, tombol WhatsApp tidak ditampilkan.
      const whatsappBase = result?.data?.whatsapp_url
      const whatsappUrl =
        typeof whatsappBase === 'string' &&
        whatsappBase.startsWith('https://wa.me/')
          ? `${whatsappBase.split('?')[0]}?text=${encodeURIComponent(message)}`
          : ''

      // Berhasil: kosongkan form
      latestPhoneRef.current = ''
      setFormValues({ ...initialFormValues })
      setErrors({})
      setPhoneIsValid(false)

      setWhatsappState({
        status: 'success',
        url: whatsappUrl,
      })
    } catch (error) {
      console.error('[API ERROR]', error)

      setWhatsappState({
        status: 'error',
        message:
          error instanceof TypeError
            ? 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.'
            : error instanceof Error
              ? error.message
              : 'Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <>
      <style>{`
        .demo-page .demo-form {
          position: relative;
          isolation: isolate;
          width: 100%;
          margin: 0;
          padding: clamp(28px, 4vw, 40px);
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.035);
        }

        .demo-page .demo-form__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px 20px;
        }

        .demo-page .demo-form__privacy {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 18px;
          color: #747474;
          font-size: 11px;
          line-height: 1.7;
          text-align: center;
        }

        @media (max-width: 800px) {
          .demo-page .demo-form {
            padding: 26px;
          }

          .demo-page .demo-form__grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .demo-page .demo-form {
            padding: 22px 18px;
            border-radius: 10px;
          }

          .demo-page .demo-form__privacy {
            font-size: 10px;
          }
        }

        @media (max-width: 380px) {
          .demo-page .demo-form {
            padding: 20px 15px;
          }
        }
      `}</style>

      {/* FORM STATUS */}

      <DemoFormStatus status={whatsappState} />

      {/* DEMO REQUEST FORM */}

      <form className="demo-form" onSubmit={handleSubmit} noValidate>
        <DemoFormHeading />

        <div className="demo-form__grid">
          {/* FULL NAME */}

          <DemoFormField
            name="fullName"
            value={formValues.fullName}
            error={errors.fullName}
            onChange={updateField}
          />

          {/* ORGANIZATION */}

          <DemoFormField
            name="organization"
            value={formValues.organization}
            error={errors.organization}
            onChange={updateField}
          />

          {/* EMAIL */}

          <DemoFormField
            name="email"
            value={formValues.email}
            error={errors.email}
            onChange={updateField}
          />

          {/* WHATSAPP */}

          <DemoFormField
            name="phone"
            value={formValues.phone}
            error={errors.phone}
            onChange={updateField}
            onValidityChange={updatePhoneValidity}
          />

          {/* PREFERRED DEMO TIME */}

          <DemoFormField
            name="preferredTime"
            value={formValues.preferredTime}
            error={errors.preferredTime}
            onChange={updateField}
          />
        </div>

        {/* SUBMIT */}

        <DemoSubmitButton
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
        />

        {/* PRIVACY NOTICE */}

        <p className="demo-form__privacy">
          Informasi yang Anda berikan digunakan untuk menindaklanjuti permintaan
          demo aplikasi DREAMS.
        </p>
      </form>
    </>
  )
}

export default DemoInput
