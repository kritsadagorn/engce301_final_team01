# ENGCE301 - Term Project

This our Solution for Term Project in ENGCE301 <br/>
Visit our website [This Link](https://lab-wb.cpe-rmutl.net/team01/).

## Overview (Wallboard/Agent-Notifcation)

![wallboard](https://img2.pic.in.th/pic/overview.png)
![agent-notification](https://img2.pic.in.th/pic/Screenshot-2025-03-20-025911.png)


### R.1.1

![r.1.1](https://img5.pic.in.th/file/secure-sv1/r.1.1.png)

### R.1.2, R.2.2

![r1.2,r2.2](https://img2.pic.in.th/pic/r1.2r2.2.png)

### R.1.3, R.2.2

![r1.3,r2.2](https://img5.pic.in.th/file/secure-sv1/r1.3r2.2.png)

### R.1.4, R.2.3

![r1.4,r2.3](https://img2.pic.in.th/pic/r1.4r2.3.png)

## **DFD**

![1](https://img2.pic.in.th/pic/158c2490280703cef.jpg)

## **ER Diagram**
![ER](https://img2.pic.in.th/pic/ER.jpg)

## **Activity Flow Diagram**

![483701863 1910788503022225 3540513204301345529 n](https://img2.pic.in.th/pic/483701863_1910788503022225_3540513204301345529_n.jpg)

## **Test Case**

## **Test Case (Agent Notification)**
| Test Section | Test Description | Test Step | Test Result |
|----------|----------|----------| ----------| 
| R 1.1| Agent สามารถ Login โดยใช้ Password ได้ โดยถ้า Password ผิดจะไม่สามารถ login ได้|1.กรอก Username/password2.กดปุ่ม Login | รหัสถูกจะเข้าสู่ระบบได้ รหัสผิดจะเข้าสู่ระบบไม่ได้ |
|R 1.2|สามารถเก็บประวัติการ login และ logout ได้ ในรูปแบบของวันเวลาที่ Login/Logout|ทดสอบการ Login-Logout เเละดูผลการทดสอบผ่านเว็บ|เเสดงผลประวัติการ login/logout , วันเเละเวลาที่เข้า-ออก ของ Agent บนเว็บ|
|R 1.3|สามารถเก็บประวัติการเปลี่ยนสถานะเวลาเริ่มต้นและสิ้นสุดแต่ละสถานะได้|ทดสอบโดยการส่ง Request เพื่ออัพเดทสถานะของ Agent|เเสดงผลการเปลี่ยนสถานะของ Agent บนเว็บ|
|R 1.4|สามารถเก็บประวัติการพูดคุยของแต่ละ Agent ได้|ทดสอบการส่งข้อความจาก Agent หนึ่งไปยังอีก Agent หนึ่ง และบันทึกข้อความนั้นผ่าน API|มีการเเสดงประวัติการส่งข้อความของ Agent , รายชื่อผู้ส่ง-รับ บนเว็บ|
## **Test Case (Agent Wallboard)**
| Test Section | Test Description | Test Step | Test Result |
|----------|----------|----------| ----------|
|R 2.1|สามารถแสดง Banner ที่ wallboard รวมทุก Agent ได้|ตรวจสอบ route /wallboard |มี Banner เเสดงสถานะการทำงานของ Agent|
|R 2.2|สามารถแสดงประวัติการ login logout และการเปลี่ยนสถานะของแต่ละ Agent ได้|ทดสอบการ Login - Logout ของ Agent ผ่าน agent-notification|มีการเเสดงประวัติการเข้า-ออก ของ Agent |
|R 2.3|สามารถเเสดงประวัติการพูดคุยของเเต่ละ Agent ได้|ทดสอบส่ง message จาก Agent สู่ Agent หนึ่ง ผ่าน agent-notification|มีการเเสดงประวัติการส่งข้อความของ Agent , รายชื่อผู้ส่ง-รับ |

## **API Specification**

Link to API Specification Documentation: [This Link](./docs/api/README.md).

## Work Breakdown Structure (WBS)

![Backend Development](https://pic.in.th/image/1.KBLljh)

## Our Team

- Team Leader นายกฤษฎากรณ์ ปุนนพานิช 65543206002-9
- System Analyst (SA) นายรชตะ รุ่งราตรี 65543206031-8
- Developer นายวุฒิภัทร ศรีคำ 65543206035-9
- Tester นายธีรภัทร กันทอง 65543206017-7
