# เด่นโมดิฟายระยอง / Den Modify Rayong Landing Page

เว็บไซต์ Landing Page สองภาษา สำหรับเด่นโมดิฟายระยอง ร้านระบบไฟรถยนต์และแต่งรถในจังหวัดระยอง ประเทศไทย

เอกสารภาษาอังกฤษอยู่ที่ [README.md](README.md)

## กติกาเอกสาร

ทุกครั้งที่แก้ไขเอกสาร ข้อความบนเว็บไซต์ คำแปล คู่มือติดตั้ง หรือข้อมูล deploy ต้องอัปเดตทั้งเวอร์ชั่นภาษาไทยและภาษาอังกฤษพร้อมกัน

## ภาพรวมโปรเจกต์

- Landing page สไตล์ SaaS ที่ดูสะอาด ทันสมัย และน่าเชื่อถือ
- React + Vite + Tailwind CSS
- ระบบสลับภาษาไทย / อังกฤษ
- ระบบ Light mode / Dark mode
- ฟอร์มจองคิวที่เชื่อม Supabase
- หน้า Admin CMS ที่ `/admin` สำหรับแก้โลโก้ ข้อความหน้าแรก ช่องทางติดต่อ สาขา และรูปผลงาน
- พร้อม deploy บน Cloudflare Pages

## เทคโนโลยีที่ใช้

- React
- Vite
- Tailwind CSS
- lucide-react
- Supabase JavaScript client

## การรันในเครื่อง

```bash
npm install
npm run dev
```

## การ build

```bash
npm run build
```

## Environment Variables

เมื่อต้องการทดสอบ Supabase ในเครื่อง ให้สร้างไฟล์ `.env` จาก `.env.example`

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

ห้าม commit ไฟล์ `.env` ขึ้น GitHub ให้ commit เฉพาะ `.env.example`

## การตั้งค่า Supabase

1. สร้าง Supabase project
2. เปิด SQL Editor ใน Supabase
3. รันไฟล์ SQL นี้:

```bash
supabase/schema.sql
```

4. ไปที่ Project Settings / API Keys
5. คัดลอก Project URL
6. คัดลอก anon key หรือ publishable key
7. นำทั้งสองค่าไปใส่ใน Environment Variables ของ Cloudflare Pages

ฟอร์มจองคิวจะบันทึกข้อมูลลงตาราง `bookings` รวมถึงสาขาที่ลูกค้าเลือกในคอลัมน์ `branch` โดยเปิด Row Level Security แล้ว ผู้ใช้ทั่วไปสามารถเพิ่มคำขอจองคิวได้เท่านั้น และไม่สามารถอ่าน แก้ไข หรือลบข้อมูลได้

หน้า Admin CMS จะบันทึกข้อมูลเว็บไซต์ลงตาราง `site_content` และอัปโหลดรูปเข้า Storage bucket ชื่อ `site-assets` ผู้ใช้ทั่วไปอ่านข้อมูลเว็บไซต์และรูปภาพได้ แต่มีเฉพาะผู้ใช้ Supabase ที่ล็อกอินแล้วเท่านั้นที่แก้ข้อมูลหรืออัปโหลดรูปได้

## การตั้งค่า Admin CMS

หน้า Admin อยู่ที่:

```bash
https://YOUR_DOMAIN/admin
```

ก่อนใช้งาน:

1. รันไฟล์ `supabase/schema.sql` เวอร์ชั่นล่าสุดใน Supabase SQL Editor
2. ใน Supabase ไปที่ Authentication / Users
3. สร้างผู้ดูแลระบบด้วยอีเมลและรหัสผ่าน
4. เปิด `/admin`
5. ล็อกอินด้วยอีเมลและรหัสผ่านของผู้ดูแล
6. แก้โลโก้ ข้อความ Hero ช่องทางติดต่อ สาขา และรูปผลงาน
7. กดบันทึกข้อมูล

ห้ามเผยแพร่รหัสผ่านของบัญชีผู้ดูแลต่อสาธารณะ

## การตั้งค่า Cloudflare Pages

1. Push โปรเจกต์ขึ้น GitHub repository
2. เข้า Cloudflare Pages แล้วเชื่อมต่อ GitHub repository
3. ใช้ค่าการ build ดังนี้:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 18 หรือใหม่กว่า

โปรเจกต์นี้มีไฟล์ `wrangler.toml` ที่ตั้งค่า `pages_build_output_dir = "dist"` ไว้แล้ว เพื่อให้ Cloudflare Pages deploy ไฟล์ที่ build จาก Vite ไม่ใช่ไฟล์จาก root ของ repository

4. เพิ่ม Environment Variables ใน Cloudflare Pages:

```bash
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Redeploy หลังจากเพิ่มหรือแก้ไข Environment Variables

เพราะเว็บนี้เป็น Vite single-page app โปรเจกต์จึงมีไฟล์ `public/_redirects` เพื่อให้ `/admin` และ route อื่น ๆ โหลดได้ถูกต้องบน Cloudflare Pages

## การตั้งค่า GitHub

1. Push source code ของโปรเจกต์ขึ้น GitHub
2. ห้าม commit `.env`
3. ให้ commit `.env.example`
4. ห้ามนำ Supabase `service_role` key ใส่ใน repository หรือ frontend code

## หมายเหตุด้านความปลอดภัย

- Frontend code ต้องใช้เฉพาะ `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
- ห้ามเปิดเผย Supabase `service_role` key ใน frontend code
- ข้อมูลการจองของลูกค้าถูกบันทึกใน Supabase และไม่ถูกแสดงแบบสาธารณะบนเว็บไซต์
