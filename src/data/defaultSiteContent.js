export const defaultSiteContent = {
  brand: {
    logoUrl: '',
  },
  hero: {
    dashboardImageUrl: '',
    th: {
      badge: 'อู่ระบบรถยนต์ยุคใหม่ในระยอง',
      headline: 'แต่งให้เด่น แก้ให้จบ ครบเรื่องระบบรถยนต์',
      description:
        'อัปเกรดจอ Android ระบบไฟ ไฟหน้า กล้องถอย เครื่องเสียง และงานติดตั้งระบบรถยนต์แบบมืออาชีพ ติดตั้งเรียบร้อย ทดสอบก่อนส่งมอบ ใช้งานได้จริง',
    },
    en: {
      badge: 'Modern automotive garage in Rayong',
      headline: 'Make your car stand out. Fix every system right.',
      description:
        'Upgrade Android screens, electrical systems, headlights, reverse cameras, car audio, and automotive installations with professional workmanship, clean wiring, full testing, and real-world usability.',
    },
  },
  contact: {
    line: '@denmodify',
    lineHref: 'https://line.me/R/ti/p/@denmodify',
    hours: '09:00–18:00',
    phoneNumbers: [
      { label: 'เบอร์ 1', labelEn: 'Phone 1', value: '0896005500', href: 'tel:0896005500' },
      { label: 'เบอร์ 2', labelEn: 'Phone 2', value: '0991944289', href: 'tel:0991944289' },
    ],
    facebookPages: [
      { label: 'Facebook Page 1', value: 'เด่นโมดิฟายระยองบายพาส 36', valueEn: 'Den Modify Rayong Bypass 36', href: 'https://www.facebook.com/DenmodifyRayong36' },
      { label: 'Facebook Page 2', value: 'เด่นโมดิฟายระยองนิคมพัฒนา สาขามะขามคู่', valueEn: 'Den Modify Rayong Nikhom Phatthana, Makham Khu Branch', href: 'https://www.facebook.com/DenmodifyMakhamKhu/' },
      { label: 'Facebook Page 3', value: 'ร้านเด่นโมดิฟายระยอง', valueEn: 'Den Modify Rayong Shop', href: 'https://www.facebook.com/DenRayong36/' },
      { label: 'Facebook Page 4', value: 'ซ่อมเบาะขึ้นลงไม่ได้ กระจกไฟฟ้าขึ้น-ลง-พับไม่ได้ เด่นโมดิฟายระยอง', valueEn: 'Seat, power window, and mirror repair by Den Modify Rayong', href: 'https://www.facebook.com/Denmodify36/' },
      { label: 'Facebook Page 5', value: 'จอแอนดรอยด์เด่นโมดิฟายระยอง', valueEn: 'Android Screen Den Modify Rayong', href: 'https://www.facebook.com/DenmodifyAndroid/' },
    ],
    branches: [
      { label: 'สาขา 1', labelEn: 'Branch 1', value: 'สาขาบายพาส 36', valueEn: 'Bypass 36 Branch', href: 'https://g.page/r/CQFqeOPlHWHyEBE/' },
      { label: 'สาขา 2', labelEn: 'Branch 2', value: 'สาขามะขามคู่', valueEn: 'Makham Khu Branch', href: 'https://g.page/r/CTFADgnU7ZEZEBE/' },
    ],
  },
  portfolioItems: [
    { id: 'fortuner', category: 'android', imageUrl: '', th: { title: 'อัปเกรดจอ Android พร้อมตั้งค่ากล้อง', car: 'Toyota Fortuner', service: 'Android Screen', status: 'ส่งมอบแล้ว' }, en: { title: 'Android screen upgrade with camera setup', car: 'Toyota Fortuner', service: 'Android Screen', status: 'Delivered' } },
    { id: 'civic', category: 'camera', imageUrl: '', th: { title: 'ติดตั้งกล้องถอยภาพคมชัด', car: 'Honda Civic', service: 'Reverse Camera', status: 'ทดสอบผ่าน' }, en: { title: 'Clear reverse camera installation', car: 'Honda Civic', service: 'Reverse Camera', status: 'Tested' } },
    { id: 'dmax', category: 'electrical', imageUrl: '', th: { title: 'จัดระบบไฟและตรวจอาการจุกจิก', car: 'Isuzu D-Max', service: 'Electrical System', status: 'แก้ไขสำเร็จ' }, en: { title: 'Electrical cleanup and issue inspection', car: 'Isuzu D-Max', service: 'Electrical System', status: 'Resolved' } },
    { id: 'mazda', category: 'audio', imageUrl: '', th: { title: 'อัปเกรดลำโพงและปรับจูนเสียง', car: 'Mazda 2', service: 'Car Audio', status: 'พร้อมใช้งาน' }, en: { title: 'Speaker upgrade and audio tuning', car: 'Mazda 2', service: 'Car Audio', status: 'Ready' } },
    { id: 'yaris', category: 'lighting', imageUrl: '', th: { title: 'ปรับไฟหน้าและไฟเสริม', car: 'Toyota Yaris', service: 'Lighting', status: 'ส่งมอบแล้ว' }, en: { title: 'Headlight and auxiliary light setup', car: 'Toyota Yaris', service: 'Lighting', status: 'Delivered' } },
    { id: 'ranger', category: 'diagnostic', imageUrl: '', th: { title: 'ไล่อาการระบบและตรวจจุดต่อพ่วง', car: 'Ford Ranger', service: 'Troubleshooting', status: 'แก้จบ' }, en: { title: 'System diagnosis and accessory wiring check', car: 'Ford Ranger', service: 'Troubleshooting', status: 'Fixed' } },
  ],
};

export function mergeSiteContent(base, override) {
  if (!override || typeof override !== 'object') {
    return base;
  }

  return {
    ...base,
    ...override,
    brand: { ...base.brand, ...override.brand },
    hero: {
      ...base.hero,
      ...override.hero,
      th: { ...base.hero.th, ...override.hero?.th },
      en: { ...base.hero.en, ...override.hero?.en },
    },
    contact: {
      ...base.contact,
      ...override.contact,
    },
    portfolioItems: override.portfolioItems?.length ? override.portfolioItems : base.portfolioItems,
  };
}
