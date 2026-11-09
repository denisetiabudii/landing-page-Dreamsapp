import { useEffect, useRef } from "react";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";

import DemoFieldError from "./DemoFieldError";
import { MAX_PHONE_LENGTH, keepDigits, sanitizePhone } from "../validation";

// =========================================
// DIGIT-ONLY INPUT HANDLERS
// =========================================

// Blokir karakter non-angka saat mengetik
function handleBeforeInput(event) {
  if (event.data && keepDigits(event.data) !== event.data) {
    event.preventDefault();
  }
}

// Drag & drop teks ke input tidak diizinkan
function handleDrop(event) {
  event.preventDefault();
}

// =========================================
// DEMO PHONE
// =========================================

function DemoPhone({ value, error, onChange, onValidityChange }) {
  const itiRef = useRef(null);
  const lastEmittedRef = useRef(value ?? "");

  // Sinkronkan perubahan dari luar (mis. reset form setelah submit)
  useEffect(() => {
    const next = value ?? "";

    // Abaikan nilai yang berasal dari ketikan user sendiri
    if (next === lastEmittedRef.current) return;

    lastEmittedRef.current = next;

    const instance = itiRef.current?.getInstance?.();
    if (instance) {
      instance.setNumber(next ? `+${next}` : "");
    }
  }, [value]);

  // Paste:
  // - Diawali "+" atau "00" -> dianggap nomor internasional lengkap,
  //   negara dipilih otomatis dari kode negaranya.
  // - Selain itu -> ambil angkanya saja, sisipkan di posisi kursor.
  // Batas panjang per negara ditangani oleh strictMode intl-tel-input.
  const handlePaste = (event) => {
    event.preventDefault();

    const input = event.currentTarget;
    const raw = event.clipboardData.getData("text").trim();
    const digits = keepDigits(raw);

    if (!digits) return;

    const isInternational = raw.startsWith("+") || raw.startsWith("00");

    if (isInternational) {
      const full = (raw.startsWith("00") ? digits.slice(2) : digits).slice(
        0,
        MAX_PHONE_LENGTH,
      );
      const instance = itiRef.current?.getInstance?.();

      if (instance && full) {
        instance.setNumber(`+${full}`);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      return;
    }

    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;

    input.setRangeText(digits.slice(0, MAX_PHONE_LENGTH), start, end, "end");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  // Validasi ketat per negara (pola awalan + panjang), bukan hanya panjang.
  // isValidNumber() di intl-tel-input versi baru hanya memeriksa panjang,
  // sedangkan isValidNumberPrecise() memeriksa pola nomor tiap negara.
  const checkValidity = () => {
    const instance = itiRef.current?.getInstance?.();
    if (!instance) return false;

    const result =
      typeof instance.isValidNumberPrecise === "function"
        ? instance.isValidNumberPrecise()
        : instance.isValidNumber();

    return Boolean(result);
  };

  const handleChangeNumber = (phoneNumber) => {
    const sanitized = sanitizePhone(phoneNumber);
    lastEmittedRef.current = sanitized;
    onChange("phone", sanitized);
    onValidityChange(checkValidity());
  };

  const handleChangeCountry = () => {
    onValidityChange(checkValidity());
  };

  return (
    <>
      <style>{`
        /* =========================================
           PHONE WRAPPER
        ========================================= */

        .demo-page .demo-form__phone {
          width: 100%;
          min-width: 0;
        }

        .demo-page .demo-form__field > * {
          min-width: 0;
          max-width: 100%;
        }

        .demo-page .demo-form__phone .iti {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          gap: 0;
        }

        /* =========================================
           COUNTRY SELECTOR
           Urutan: bendera → kode negara → panah
        ========================================= */

        /* Container masuk ke alur flex & jadi acuan posisi dropdown */
        .demo-page .demo-form__phone .iti__country-container {
          position: relative;
          inset: auto;
          grid-column: 1;
          grid-row: 1;
          display: flex;
          padding: 0;
        }

        .demo-page .demo-form__phone .iti__selected-country {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 100%;
          min-height: 48px;
          padding: 0 12px;
          background: #ffffff;
          border: 1px solid #c9c9c9;
          border-right: 0;
          border-radius: 8px 0 0 8px;
          transition:
            background-color 0.2s ease,
            border-color 0.2s ease;
        }

        .demo-page .demo-form__phone .iti__selected-country:hover {
          background: #f8fafc;
        }

        .demo-page .demo-form__phone .iti__selected-country:focus-visible {
          outline: 2px solid #0176d3;
          outline-offset: -2px;
          z-index: 2;
        }

        /* Lepas wrapper agar flag & arrow jadi anak langsung tombol */
        .demo-page .demo-form__phone .iti__selected-country-primary {
          display: contents;
        }

        /* 1. Bendera */
        .demo-page .demo-form__phone .iti__selected-country .iti__flag {
          order: 1;
          flex-shrink: 0;
        }

        /* 2. Kode negara */
        .demo-page .demo-form__phone .iti__selected-dial-code {
          order: 2;
          margin: 0;
          color: #181818;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
        }

        /* 3. Panah dropdown */
        .demo-page .demo-form__phone .iti__arrow {
          order: 3;
          margin: 0;
          border-top-color: #5c5c5c;
        }

        .demo-page .demo-form__phone .iti__arrow--up {
          border-bottom-color: #0176d3;
        }

        /* =========================================
           PHONE INPUT
        ========================================= */

        .demo-page .demo-form__phone .iti__tel-input {
          position: relative;
          grid-column: 2;
          grid-row: 1;
          width: 100% !important;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          min-height: 48px;
          margin: 0;
          /* menimpa inline padding-left dari library */
          padding: 12px 14px !important;
          color: #181818;
          background: #ffffff;
          border: 1px solid #c9c9c9;
          border-radius: 0 8px 8px 0;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .demo-page .demo-form__phone .iti__tel-input::placeholder {
          color: #747474;
          opacity: 1;
        }

        .demo-page .demo-form__phone .iti__tel-input:hover {
          border-color: #747474;
        }

        .demo-page .demo-form__phone .iti__tel-input:focus {
          z-index: 1;
          border-color: #0176d3;
          box-shadow: 0 0 0 1px #0176d3;
        }

        /* =========================================
           FOCUS COUNTRY SELECTOR
        ========================================= */

        .demo-page .demo-form__phone:focus-within
        .iti__selected-country {
          border-color: #0176d3;
        }

        /* =========================================
           INVALID PHONE
        ========================================= */

        .demo-page .demo-form__phone
        .iti__tel-input[aria-invalid="true"] {
          border-color: #ba0517;
          background-color: #fffafa;
        }

        .demo-page .demo-form__phone
        .iti__tel-input[aria-invalid="true"]:focus {
          border-color: #ba0517;
          box-shadow: 0 0 0 1px rgba(186, 5, 23, 0.2);
        }

        .demo-page .demo-form__phone:has(
          .iti__tel-input[aria-invalid="true"]
        ) .iti__selected-country {
          border-color: #ba0517;
        }

        /* =========================================
           COUNTRY DROPDOWN
        ========================================= */

        .demo-page .demo-form__phone .iti__dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          min-width: 280px;
          margin-top: 6px;
          color: #181818;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .demo-page .demo-form__phone .iti__country-list {
          max-height: 240px;
          overflow-y: auto;
          padding: 6px;
          background: #ffffff;
          border-radius: 10px;
        }

        .demo-page .demo-form__phone .iti__country {
          display: flex;
          align-items: center;
          min-height: 38px;
          padding: 9px 12px;
          color: #181818;
          border-radius: 6px;
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .demo-page .demo-form__phone .iti__country:hover {
          background: #f3f3f3;
        }

        .demo-page .demo-form__phone .iti__country.iti__highlight {
          background: #eaf5fe;
        }

        .demo-page .demo-form__phone .iti__country.iti__active {
          color: #0176d3;
          background: #eaf5fe;
          font-weight: 600;
        }

        .demo-page .demo-form__phone .iti__dial-code {
          color: #747474;
          margin-left: 6px;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 480px) {
          .demo-page .demo-form__phone .iti__selected-country {
            padding-inline: 10px;
          }

          .demo-page .demo-form__phone .iti__selected-dial-code {
            font-size: 13px;
          }

          .demo-page .demo-form__phone .iti__tel-input {
            padding: 12px !important;
            font-size: 13px;
          }

          .demo-page .demo-form__phone .iti__dropdown-content {
            min-width: 250px;
            max-width: calc(100vw - 40px);
          }

          .demo-page .demo-form__phone .iti__country {
            min-height: 40px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="demo-form__field">
        <label htmlFor="demo-phone">Nomor WhatsApp</label>

        <div className="demo-form__phone">
          <IntlTelInput
            ref={itiRef}
            initialCountry="id"
            separateDialCode
            countrySearch={false}
            strictMode
            autoPlaceholder="aggressive"
            placeholderNumberType="MOBILE"
            validationNumberTypes={["MOBILE", "FIXED_LINE_OR_MOBILE"]}
            initialValue={value}
            onChangeNumber={handleChangeNumber}
            onChangeCountry={handleChangeCountry}
            loadUtils={() => import("intl-tel-input/utils")}
            inputProps={{
              id: "demo-phone",
              name: "phone",
              autoComplete: "tel-national",
              inputMode: "numeric",
              onBeforeInput: handleBeforeInput,
              onPaste: handlePaste,
              onDrop: handleDrop,
              "aria-invalid": Boolean(error),
              "aria-describedby": error ? "demo-phone-error" : undefined,
            }}
          />
        </div>

        <DemoFieldError id="demo-phone-error">{error}</DemoFieldError>
      </div>
    </>
  );
}

export default DemoPhone;
