export interface Country {
  flag: string;
  name: string;
  code: string;
  mask: string;
}

export const COUNTRIES: Country[] = [
  { flag: "🇧🇷", name: "Brazil", code: "+55", mask: "(00) 00000-0000" },
  { flag: "🇺🇸", name: "United States", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇨🇦", name: "Canada", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇵🇹", name: "Portugal", code: "+351", mask: "000 000 000" },
  { flag: "🇪🇸", name: "Spain", code: "+34", mask: "000 000 000" },
  { flag: "🇫🇷", name: "France", code: "+33", mask: "0 00 00 00 00" },
  { flag: "🇩🇪", name: "Germany", code: "+49", mask: "0000 0000000" },
  { flag: "🇮🇹", name: "Italy", code: "+39", mask: "000 000 0000" },
  { flag: "🇬🇧", name: "United Kingdom", code: "+44", mask: "00000 000000" },
  { flag: "🇳🇱", name: "Netherlands", code: "+31", mask: "00 00000000" },
  { flag: "🇧🇪", name: "Belgium", code: "+32", mask: "0000 00 00 00" },
  { flag: "🇨🇭", name: "Switzerland", code: "+41", mask: "000 000 00 00" },
  { flag: "🇦🇹", name: "Austria", code: "+43", mask: "0000 000000" },
  { flag: "🇸🇪", name: "Sweden", code: "+46", mask: "000 000 00 00" },
  { flag: "🇳🇴", name: "Norway", code: "+47", mask: "0000 0000" },
  { flag: "🇩🇰", name: "Denmark", code: "+45", mask: "0000 0000" },
  { flag: "🇫🇮", name: "Finland", code: "+358", mask: "000 000 0000" },
  { flag: "🇮🇪", name: "Ireland", code: "+353", mask: "000 000 0000" },
  { flag: "🇵🇱", name: "Poland", code: "+48", mask: "000 000 000" },
  { flag: "🇨🇿", name: "Czech Republic", code: "+420", mask: "000 000 000" },
  { flag: "🇭🇺", name: "Hungary", code: "+36", mask: "(00) 000 0000" },
  { flag: "🇷🇴", name: "Romania", code: "+40", mask: "0000 000 000" },
  { flag: "🇬🇷", name: "Greece", code: "+30", mask: "000 000 0000" },
  { flag: "🇷🇺", name: "Russia", code: "+7", mask: "(000) 000-00-00" },
  { flag: "🇺🇦", name: "Ukraine", code: "+380", mask: "000 000 00 00" },
  { flag: "🇹🇷", name: "Turkey", code: "+90", mask: "(000) 000 00 00" },
  { flag: "🇸🇰", name: "Slovakia", code: "+421", mask: "000 000 000" },
  { flag: "🇸🇮", name: "Slovenia", code: "+386", mask: "00 000 000" },
  { flag: "🇭🇷", name: "Croatia", code: "+385", mask: "00 000 0000" },
  { flag: "🇷🇸", name: "Serbia", code: "+381", mask: "00 000 0000" },
  { flag: "🇧🇦", name: "Bosnia and Herzegovina", code: "+387", mask: "00 000 000" },
  { flag: "🇲🇪", name: "Montenegro", code: "+382", mask: "00 000 000" },
  { flag: "🇲🇰", name: "North Macedonia", code: "+389", mask: "00 000 000" },
  { flag: "🇦🇱", name: "Albania", code: "+355", mask: "000 000 0000" },
  { flag: "🇧🇬", name: "Bulgaria", code: "+359", mask: "000 000 000" },
  { flag: "🇱🇹", name: "Lithuania", code: "+370", mask: "000 00000" },
  { flag: "🇱🇻", name: "Latvia", code: "+371", mask: "000 00000" },
  { flag: "🇪🇪", name: "Estonia", code: "+372", mask: "000 0000" },
  { flag: "🇧🇾", name: "Belarus", code: "+375", mask: "(00) 000-00-00" },
  { flag: "🇲🇩", name: "Moldova", code: "+373", mask: "000 000 000" },
  { flag: "🇱🇺", name: "Luxembourg", code: "+352", mask: "000 000 000" },
  { flag: "🇮🇸", name: "Iceland", code: "+354", mask: "000 0000" },
  { flag: "🇲🇹", name: "Malta", code: "+356", mask: "0000 0000" },
  { flag: "🇨🇾", name: "Cyprus", code: "+357", mask: "00 000000" },
  { flag: "🇦🇩", name: "Andorra", code: "+376", mask: "000 000" },
  { flag: "🇱🇮", name: "Liechtenstein", code: "+423", mask: "000 0000" },
  { flag: "🇲🇨", name: "Monaco", code: "+377", mask: "00 00 00 00" },
  { flag: "🇬🇪", name: "Georgia", code: "+995", mask: "000 00 00 00" },
  { flag: "🇦🇲", name: "Armenia", code: "+374", mask: "00 000000" },
  { flag: "🇦🇿", name: "Azerbaijan", code: "+994", mask: "000 000 00 00" },
  { flag: "🇮🇱", name: "Israel", code: "+972", mask: "000-000-0000" },
  { flag: "🇦🇺", name: "Australia", code: "+61", mask: "0000 000 000" },
  { flag: "🇳🇿", name: "New Zealand", code: "+64", mask: "000 000 0000" },
  { flag: "🇯🇵", name: "Japan", code: "+81", mask: "000-0000-0000" },
  { flag: "🇰🇷", name: "South Korea", code: "+82", mask: "000-0000-0000" },
  { flag: "🇨🇳", name: "China", code: "+86", mask: "000 0000 0000" },
  { flag: "🇮🇳", name: "India", code: "+91", mask: "00000 00000" },
  { flag: "🇲🇽", name: "Mexico", code: "+52", mask: "000 000 0000" },
  { flag: "🇦🇷", name: "Argentina", code: "+54", mask: "(000) 0000-0000" },
  { flag: "🇨🇴", name: "Colombia", code: "+57", mask: "000 000 0000" },
  { flag: "🇨🇱", name: "Chile", code: "+56", mask: "0 0000 0000" },
  { flag: "🇵🇪", name: "Peru", code: "+51", mask: "000 000 000" },
  { flag: "🇻🇪", name: "Venezuela", code: "+58", mask: "0000 000 0000" },
  { flag: "🇺🇾", name: "Uruguay", code: "+598", mask: "000 000 000" },
  { flag: "🇵🇾", name: "Paraguay", code: "+595", mask: "000 000 000" },
  { flag: "🇧🇴", name: "Bolivia", code: "+591", mask: "00 000 000" },
  { flag: "🇪🇨", name: "Ecuador", code: "+593", mask: "000 000 0000" },
  { flag: "🇵🇦", name: "Panama", code: "+507", mask: "0000-0000" },
  { flag: "🇨🇷", name: "Costa Rica", code: "+506", mask: "0000-0000" },
  { flag: "🇬🇹", name: "Guatemala", code: "+502", mask: "0000-0000" },
  { flag: "🇩🇴", name: "Dominican Republic", code: "+1", mask: "(000) 000-0000" },
  { flag: "🇨🇺", name: "Cuba", code: "+53", mask: "0 000 0000" },
  { flag: "🇿🇦", name: "South Africa", code: "+27", mask: "00 000 0000" },
  { flag: "🇦🇴", name: "Angola", code: "+244", mask: "000 000 000" },
  { flag: "🇲🇿", name: "Mozambique", code: "+258", mask: "00 000 0000" },
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
