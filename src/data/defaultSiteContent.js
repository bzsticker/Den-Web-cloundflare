export const defaultSiteContent = {
  brand: {
    logoUrl: '',
    th: {
      name: 'เด่นโมดิฟายระยอง',
      altName: 'Den Modify Rayong',
      short: 'เด่นโมดิฟาย',
    },
    en: {
      name: 'Den Modify Rayong',
      altName: 'เด่นโมดิฟายระยอง',
      short: 'Den Modify',
    },
  },
  announcement: {
    th: { text: 'รับติดตั้งและแก้ระบบรถยนต์ในระยอง พร้อมทดสอบก่อนส่งมอบทุกคัน' },
    en: { text: 'Professional automotive installation and troubleshooting in Rayong, tested before every handoff' },
  },
  hero: {
    dashboardImageUrl: '',
    th: {
      badge: 'อู่ระบบรถยนต์ยุคใหม่ในระยอง',
      headline: 'แต่งให้เด่น แก้ให้จบ ครบเรื่องระบบรถยนต์',
      description: 'อัปเกรดจอ Android ระบบไฟ ไฟหน้า กล้องถอย เครื่องเสียง และงานติดตั้งระบบรถยนต์แบบมืออาชีพ ติดตั้งเรียบร้อย ทดสอบก่อนส่งมอบ ใช้งานได้จริง',
    },
    en: {
      badge: 'Modern automotive garage in Rayong',
      headline: 'Make your car stand out. Fix every system right.',
      description: 'Upgrade Android screens, electrical systems, headlights, reverse cameras, car audio, and automotive installations with professional workmanship, clean wiring, full testing, and real-world usability.',
    },
  },
  stats: [
    { id: '1', value: '1,000+', th: { label: 'งานติดตั้ง' }, en: { label: 'Installations' } },
    { id: '2', value: '500+', th: { label: 'ลูกค้าที่ไว้วางใจ' }, en: { label: 'Trusted Customers' } },
    { id: '3', value: '10+', th: { label: 'บริการระบบรถยนต์' }, en: { label: 'Automotive Services' } },
    { id: '4', value: 'Support', th: { label: 'ดูแลหลังการติดตั้ง' }, en: { label: 'After-service Support' } },
  ],
  sections: {
    services: {
      th: { eyebrow: 'บริการหลัก', title: 'ครบทุกงานติดตั้งและระบบไฟรถยนต์', description: 'เลือกอัปเกรดเฉพาะจุด หรือให้เราช่วยตรวจระบบทั้งคันแบบเป็นขั้นตอน' },
      en: { eyebrow: 'Core Services', title: 'Complete automotive installation and electrical care', description: 'Upgrade a single feature or let our team inspect your vehicle system step by step.' },
    },
    why: {
      th: { eyebrow: 'ทำไมต้องเด่นโมดิฟาย', title: 'งานเรียบร้อย เข้าใจง่าย และส่งมอบแบบพร้อมใช้งาน', description: 'เราให้ความสำคัญกับความสะอาดของงาน การทดสอบจริง และคำอธิบายหลังติดตั้ง' },
      en: { eyebrow: 'Why Choose Us', title: 'Clean workmanship, clear communication, ready-to-use delivery', description: 'We focus on tidy installation, real testing, and practical guidance after every job.' },
    },
    packages: {
      th: { eyebrow: 'แพ็กเกจยอดนิยม', title: 'เริ่มจากชุดที่เหมาะกับรถของคุณ', description: 'จัดแพ็กเกจให้เข้าใจง่าย เหมาะกับลูกค้าที่ต้องการติดตั้งเร็วและคุมงบได้' },
      en: { eyebrow: 'Popular Packages', title: 'Start with the right setup for your car', description: 'Simple package options for customers who want clear scope, smooth installation, and budget control.' },
    },
    portfolio: {
      th: { eyebrow: 'ตัวอย่างผลงาน', title: 'งานติดตั้งที่ดูสะอาดและใช้งานได้จริง', description: 'ตัวอย่างรูปแบบงานสำหรับรถหลายกลุ่ม พร้อมตัวกรองตามบริการ' },
      en: { eyebrow: 'Portfolio Preview', title: 'Clean installations built for real daily driving', description: 'Sample work across vehicle types with filters by service category.' },
    },
    reviews: {
      th: { eyebrow: 'เสียงจากลูกค้า', title: 'ลูกค้ากลับมาเพราะงานจบและอธิบายชัด', description: 'รีวิวตัวอย่างจากลูกค้าที่ติดตั้งและแก้ระบบกับเด่นโมดิฟายระยอง' },
      en: { eyebrow: 'Customer Reviews', title: 'Customers return because the work is complete and clear', description: 'Realistic sample reviews from customers who installed and fixed systems with Den Modify Rayong.' },
    },
    contact: {
      th: { eyebrow: 'ติดต่อร้าน', title: 'คุยอาการรถหรือจองคิวติดตั้ง', description: 'ส่งรุ่นรถ อาการที่พบ และรูปอุปกรณ์ที่ต้องการติดตั้งมาให้ทีมงานประเมินได้เลย' },
      en: { eyebrow: 'Contact', title: 'Discuss your car issue or book an installation', description: 'Send your car model, symptoms, and desired equipment so our team can recommend the right next step.' },
    },
  },
  services: {
    th: { cta: 'ดูรายละเอียด' },
    en: { cta: 'Learn more' },
    items: [
      { id: 'android', icon: 'MonitorSmartphone', th: { title: 'Android Screen', description: 'ติดตั้งจอ Android ให้เข้ากับรถ ใช้งานนำทาง เพลง กล้อง และแอปต่าง ๆ ได้ลื่นไหล' }, en: { title: 'Android Screen', description: 'Install Android screens that fit your vehicle and support navigation, music, cameras, and daily apps.' } },
      { id: 'electrical', icon: 'Zap', th: { title: 'Automotive Electrical System', description: 'ตรวจและแก้ระบบไฟรถยนต์ เดินสายสะอาด ลดปัญหาจุกจิกหลังติดตั้ง' }, en: { title: 'Automotive Electrical System', description: 'Inspect and repair automotive electrical systems with clean wiring and fewer follow-up issues.' } },
      { id: 'lighting', icon: 'Lightbulb', th: { title: 'Headlights & Lighting', description: 'อัปเกรดไฟหน้า ไฟเสริม และระบบแสงสว่างให้สวย ปลอดภัย และเหมาะกับการใช้งาน' }, en: { title: 'Headlights & Lighting', description: 'Upgrade headlights and auxiliary lighting for a safer, sharper, and better-looking drive.' } },
      { id: 'camera', icon: 'Camera', th: { title: 'Reverse Camera & 360 Camera', description: 'ติดตั้งกล้องถอยและกล้องรอบคัน ช่วยจอดง่าย มองเห็นชัด และเดินระบบเรียบร้อย' }, en: { title: 'Reverse Camera & 360 Camera', description: 'Install reverse and 360 cameras with clear visibility, tidy wiring, and practical positioning.' } },
      { id: 'audio', icon: 'Volume2', th: { title: 'Car Audio & Speakers', description: 'ปรับระบบเสียง ลำโพง และอุปกรณ์เสริมให้เสียงดีขึ้นโดยไม่เสียความเรียบร้อยของรถ' }, en: { title: 'Car Audio & Speakers', description: 'Improve speakers and audio systems while keeping the cabin clean and reliable.' } },
      { id: 'diagnostic', icon: 'Gauge', th: { title: 'Automotive System Troubleshooting', description: 'ไล่อาการระบบรถยนต์อย่างเป็นขั้นตอน เพื่อแก้ให้ตรงจุดและใช้งานได้มั่นใจ' }, en: { title: 'Automotive System Troubleshooting', description: 'Trace vehicle system problems step by step to fix the root cause with confidence.' } },
    ],
  },
  whyItems: [
    { id: '1', icon: 'ClipboardCheck', th: { title: 'ทดสอบก่อนส่งมอบ', text: 'เช็กการใช้งานจริงทุกระบบก่อนให้ลูกค้ารับรถ' }, en: { title: 'Tested before delivery', text: 'Every connected system is checked in real use before handoff.' } },
    { id: '2', icon: 'BadgeCheck', th: { title: 'อธิบายงานชัดเจน', text: 'แจ้งสิ่งที่ทำ อุปกรณ์ที่ใช้ และวิธีใช้งานหลังติดตั้ง' }, en: { title: 'Clear explanation', text: 'Know what was installed, what was used, and how to operate it.' } },
    { id: '3', icon: 'Cable', th: { title: 'เดินสายเรียบร้อย', text: 'โฟกัสงานติดตั้งที่สะอาด ปลอดภัย และดูแลง่าย' }, en: { title: 'Tidy wiring', text: 'Clean, safer installation that is easier to maintain later.' } },
    { id: '4', icon: 'CircleDollarSign', th: { title: 'เหมาะกับรถใช้งานจริง', text: 'แนะนำของที่ตอบโจทย์การขับขี่ ไม่เน้นขายเกินจำเป็น' }, en: { title: 'Practical recommendations', text: 'Advice based on real driving needs, not unnecessary upsells.' } },
  ],
  packages: {
    th: { recommended: 'แนะนำ', askPrice: 'สอบถามราคา' },
    en: { recommended: 'Recommended', askPrice: 'Ask for price' },
    items: [
      { id: 'starter', th: { name: 'Starter', title: 'Android Screen + Reverse Camera', description: 'ชุดเริ่มต้นสำหรับรถที่ต้องการจอใหม่และถอยจอดง่ายขึ้น', items: ['ติดตั้งจอ Android', 'ติดตั้งกล้องถอย', 'ตั้งค่าพื้นฐานพร้อมใช้งาน'], cta: 'เลือกแพ็กเกจนี้' }, en: { name: 'Starter', title: 'Android Screen + Reverse Camera', description: 'A simple upgrade for a new screen and easier parking.', items: ['Android screen installation', 'Reverse camera installation', 'Ready-to-use basic setup'], cta: 'Choose Package' } },
      { id: 'smart', th: { name: 'Smart Drive', title: 'Android Screen + Reverse Camera + Speakers', description: 'อัปเกรดการขับขี่ประจำวัน ทั้งภาพ เสียง และความสะดวก', items: ['จอ Android พร้อมกล้องถอย', 'อัปเกรดลำโพง', 'ทดสอบเสียงและภาพก่อนส่งมอบ'], cta: 'แพ็กเกจแนะนำ' }, en: { name: 'Smart Drive', title: 'Android Screen + Reverse Camera + Speakers', description: 'Upgrade daily driving with better visuals, sound, and convenience.', items: ['Android screen with reverse camera', 'Speaker upgrade', 'Audio and camera testing before delivery'], cta: 'Recommended Package' } },
      { id: 'premium', th: { name: 'Premium System', title: 'Android Screen + Audio System + Camera + Electrical Check', description: 'ชุดครบสำหรับลูกค้าที่ต้องการตรวจและยกระดับระบบหลักของรถ', items: ['จอ Android และระบบเสียง', 'กล้องถอยหรือกล้องรอบคัน', 'ตรวจเช็กระบบไฟที่เกี่ยวข้อง'], cta: 'สอบถามรายละเอียด' }, en: { name: 'Premium System', title: 'Android Screen + Audio System + Camera + Electrical Check', description: 'A complete setup for customers who want the main vehicle systems upgraded and checked.', items: ['Android screen and audio system', 'Reverse or 360 camera', 'Related electrical system check'], cta: 'Ask for Details' } },
    ],
  },
  reviews: [
    { id: 'narin', link: '', th: { name: 'คุณนรินทร์', car: 'Toyota Fortuner', service: 'จอ Android + กล้องถอย', text: 'งานติดตั้งเรียบร้อยมาก อธิบายการใช้งานชัดเจน กล้องชัดและจอใช้งานง่ายกว่าของเดิมเยอะครับ' }, en: { name: 'Narin', car: 'Toyota Fortuner', service: 'Android screen + reverse camera', text: 'The installation was very clean. The team explained every feature clearly, and the camera and screen are much easier to use than before.' } },
    { id: 'siriporn', link: '', th: { name: 'คุณศิริพร', car: 'Honda City', service: 'ระบบไฟและไฟหน้า', text: 'ร้านเช็กอาการให้ละเอียด ไม่รีบเปลี่ยนของเกินจำเป็น หลังทำแล้วไฟนิ่งขึ้นและขับกลางคืนสบายกว่าเดิมค่ะ' }, en: { name: 'Siriporn', car: 'Honda City', service: 'Electrical system and headlights', text: 'They checked the issue carefully and did not push unnecessary parts. The lights are stable now and night driving feels much better.' } },
    { id: 'kittisak', link: '', th: { name: 'คุณกิตติศักดิ์', car: 'Isuzu D-Max', service: 'เครื่องเสียง + ลำโพง', text: 'เสียงดีขึ้นชัดเจน งานสายไฟเก็บดีมาก รับรถแล้วทีมงานทดสอบให้ดูครบทุกฟังก์ชัน ประทับใจครับ' }, en: { name: 'Kittisak', car: 'Isuzu D-Max', service: 'Car audio + speakers', text: 'The sound improved a lot and the wiring was neatly hidden. The team tested every function before returning the car.' } },
  ],
  booking: {
    th: { title: 'พร้อมอัปเกรดหรือแก้ระบบรถของคุณแล้วหรือยัง', description: 'ส่งรุ่นรถและสิ่งที่ต้องการทำมาให้เรา ทีมงานจะช่วยแนะนำแพ็กเกจและเวลาติดตั้งที่เหมาะสม', primaryCta: 'จองคิวติดตั้ง', secondaryCta: 'คุยกับทีมงาน' },
    en: { title: 'Ready to upgrade or fix your vehicle system?', description: 'Send your car model and desired service. Our team will recommend the right package and installation schedule.', primaryCta: 'Book Installation', secondaryCta: 'Talk to Team' },
  },
  footer: {
    th: { description: 'อู่ระบบรถยนต์ยุคใหม่ในระยอง งานติดตั้งสะอาด ทดสอบจริง และดูแลหลังส่งมอบ', rights: 'สงวนลิขสิทธิ์' },
    en: { description: 'Modern automotive electrical and modification garage in Rayong with clean installation, real testing, and after-service support.', rights: 'All rights reserved' },
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

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeSiteContent(target, source) {
  if (!source || typeof source !== 'object') {
    return target;
  }

  const output = { ...target };

  Object.keys(source).forEach((key) => {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = mergeSiteContent(target[key], source[key]);
    } else if (Array.isArray(source[key]) && source[key].length > 0) {
      output[key] = source[key];
    } else if (source[key] !== undefined && source[key] !== null) {
      output[key] = source[key];
    }
  });

  return output;
}
