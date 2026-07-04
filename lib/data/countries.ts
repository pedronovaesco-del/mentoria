export interface Country {
  flag: string;
  name: string;
  code: string;
  mask: string;
}

export const COUNTRIES: Country[] = [
  { flag: "🇧🇷", name: "Brasil", code: "+55", mask: "(00) 00000-0000" },
  { flag: "🇺🇸", name: "Estados Unidos", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇨🇦", name: "Canadá", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇵🇹", name: "Portugal", code: "+351", mask: "000 000 000" },
  { flag: "🇪🇸", name: "Espanha", code: "+34", mask: "000 000 000" },
  { flag: "🇫🇷", name: "França", code: "+33", mask: "0 00 00 00 00" },
  { flag: "🇩🇪", name: "Alemanha", code: "+49", mask: "0000 0000000" },
  { flag: "🇮🇹", name: "Itália", code: "+39", mask: "000 000 0000" },
  { flag: "🇬🇧", name: "Reino Unido", code: "+44", mask: "00000 000000" },
  { flag: "🇳🇱", name: "Holanda", code: "+31", mask: "00 00000000" },
  { flag: "🇧🇪", name: "Bélgica", code: "+32", mask: "0000 00 00 00" },
  { flag: "🇨🇭", name: "Suíça", code: "+41", mask: "000 000 00 00" },
  { flag: "🇦🇹", name: "Áustria", code: "+43", mask: "0000 000000" },
  { flag: "🇸🇪", name: "Suécia", code: "+46", mask: "000 000 00 00" },
  { flag: "🇳🇴", name: "Noruega", code: "+47", mask: "0000 0000" },
  { flag: "🇩🇰", name: "Dinamarca", code: "+45", mask: "0000 0000" },
  { flag: "🇫🇮", name: "Finlândia", code: "+358", mask: "000 000 0000" },
  { flag: "🇮🇪", name: "Irlanda", code: "+353", mask: "000 000 0000" },
  { flag: "🇵🇱", name: "Polônia", code: "+48", mask: "000 000 000" },
  { flag: "🇨🇿", name: "República Tcheca", code: "+420", mask: "000 000 000" },
  { flag: "🇭🇺", name: "Hungria", code: "+36", mask: "(00) 000 0000" },
  { flag: "🇷🇴", name: "Romênia", code: "+40", mask: "0000 000 000" },
  { flag: "🇬🇷", name: "Grécia", code: "+30", mask: "000 000 0000" },
  { flag: "🇷🇺", name: "Rússia", code: "+7", mask: "(000) 000-00-00" },
  { flag: "🇺🇦", name: "Ucrânia", code: "+380", mask: "000 000 00 00" },
  { flag: "🇹🇷", name: "Turquia", code: "+90", mask: "(000) 000 00 00" },
  { flag: "🇸🇰", name: "Eslováquia", code: "+421", mask: "000 000 000" },
  { flag: "🇸🇮", name: "Eslovênia", code: "+386", mask: "00 000 000" },
  { flag: "🇭🇷", name: "Croácia", code: "+385", mask: "00 000 0000" },
  { flag: "🇷🇸", name: "Sérvia", code: "+381", mask: "00 000 0000" },
  { flag: "🇧🇦", name: "Bósnia e Herzegovina", code: "+387", mask: "00 000 000" },
  { flag: "🇲🇪", name: "Montenegro", code: "+382", mask: "00 000 000" },
  { flag: "🇲🇰", name: "Macedônia do Norte", code: "+389", mask: "00 000 000" },
  { flag: "🇦🇱", name: "Albânia", code: "+355", mask: "000 000 0000" },
  { flag: "🇧🇬", name: "Bulgária", code: "+359", mask: "000 000 000" },
  { flag: "🇱🇹", name: "Lituânia", code: "+370", mask: "000 00000" },
  { flag: "🇱🇻", name: "Letônia", code: "+371", mask: "000 00000" },
  { flag: "🇪🇪", name: "Estônia", code: "+372", mask: "000 0000" },
  { flag: "🇧🇾", name: "Bielorrússia", code: "+375", mask: "(00) 000-00-00" },
  { flag: "🇲🇩", name: "Moldávia", code: "+373", mask: "000 000 000" },
  { flag: "🇱🇺", name: "Luxemburgo", code: "+352", mask: "000 000 000" },
  { flag: "🇮🇸", name: "Islândia", code: "+354", mask: "000 0000" },
  { flag: "🇲🇹", name: "Malta", code: "+356", mask: "0000 0000" },
  { flag: "🇨🇾", name: "Chipre", code: "+357", mask: "00 000000" },
  { flag: "🇦🇩", name: "Andorra", code: "+376", mask: "000 000" },
  { flag: "🇱🇮", name: "Liechtenstein", code: "+423", mask: "000 0000" },
  { flag: "🇲🇨", name: "Mônaco", code: "+377", mask: "00 00 00 00" },
  { flag: "🇬🇪", name: "Geórgia", code: "+995", mask: "000 00 00 00" },
  { flag: "🇦🇲", name: "Armênia", code: "+374", mask: "00 000000" },
  { flag: "🇦🇿", name: "Azerbaijão", code: "+994", mask: "000 000 00 00" },
  { flag: "🇮🇱", name: "Israel", code: "+972", mask: "000-000-0000" },
  { flag: "🇦🇺", name: "Austrália", code: "+61", mask: "0000 000 000" },
  { flag: "🇳🇿", name: "Nova Zelândia", code: "+64", mask: "000 000 0000" },
  { flag: "🇯🇵", name: "Japão", code: "+81", mask: "000-0000-0000" },
  { flag: "🇰🇷", name: "Coreia do Sul", code: "+82", mask: "000-0000-0000" },
  { flag: "🇨🇳", name: "China", code: "+86", mask: "000 0000 0000" },
  { flag: "🇮🇳", name: "Índia", code: "+91", mask: "00000 00000" },
  { flag: "🇲🇽", name: "México", code: "+52", mask: "000 000 0000" },
  { flag: "🇦🇷", name: "Argentina", code: "+54", mask: "(000) 0000-0000" },
  { flag: "🇨🇴", name: "Colômbia", code: "+57", mask: "000 000 0000" },
  { flag: "🇨🇱", name: "Chile", code: "+56", mask: "0 0000 0000" },
  { flag: "🇵🇪", name: "Peru", code: "+51", mask: "000 000 000" },
  { flag: "🇻🇪", name: "Venezuela", code: "+58", mask: "0000 000 0000" },
  { flag: "🇺🇾", name: "Uruguai", code: "+598", mask: "000 000 000" },
  { flag: "🇵🇾", name: "Paraguai", code: "+595", mask: "000 000 000" },
  { flag: "🇧🇴", name: "Bolívia", code: "+591", mask: "00 000 000" },
  { flag: "🇪🇨", name: "Equador", code: "+593", mask: "000 000 0000" },
  { flag: "🇵🇦", name: "Panamá", code: "+507", mask: "0000-0000" },
  { flag: "🇨🇷", name: "Costa Rica", code: "+506", mask: "0000-0000" },
  { flag: "🇬🇹", name: "Guatemala", code: "+502", mask: "0000-0000" },
  { flag: "🇩🇴", name: "República Dominicana", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇨🇺", name: "Cuba", code: "+53", mask: "0 000 0000" },
  { flag: "🇿🇦", name: "África do Sul", code: "+27", mask: "00 000 0000" },
  { flag: "🇦🇴", name: "Angola", code: "+244", mask: "000 000 000" },
  { flag: "🇲🇿", name: "Moçambique", code: "+258", mask: "00 000 0000" },
];

export function applyPhoneMask(raw: string, mask: string): string {
  const digits = raw.replace(/\D/g, "");
  let result = "";
  let di = 0;
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    result += mask[i] === "0" ? digits[di++] : mask[i];
  }
  return result;
}
