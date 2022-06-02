# IoT Smart Range Detect Integrated Web - Water Level Meter
Alat untuk deteksi level air 
menggunakan sensor ultrasonik 
untuk penghematan air

# Team [Nama - NIM]
- Andros Clarence Chen 	2440023886
- Fajar Muhammad Hamka 	2440113616
- Naufal Bambang Nugraha 	2440056575
- Sarwinder 			2440123371
- Zefany Athalia 		2440034901

# Cara Pengunaan
- Make sure kalian udah install node.js, platform.io, MySQL, XAMPP
- Install nodemon
```
npm install -g nodemon
```
- Jalankan Apache dan MySQL di XAMPP!
- Masuk ke localhost/phpmyadmin dan buat database dengan nama iot_smart_range_detect
- Ubah fie Database.js didalam folder server/config/database.js sesuai dengan konfigurasi pada database masing-masing
- Uncomment script ```// await Ranges.sync();``` apabila model/table belum terbuat
 File ini terdapat pada index.js yang ada di directory server/index.js
- Apabila tabel/model sudah terbuat biarkan saja tetap di comment
- Buka terminal baru, pindah directory terminal ke server lalu jalankan servernya (Terminal jangan dimatikan!)
```
cd server
cd npm run dev
```
- Buka terminal baru, pindah directory terminal ke client lalu jalankan scriptnya (Terminal jangan dimatikan!)
```
cd client
npm start
```
- Upload script main.cpp ke node mcu
 File terdapat di directory src/main.cpp
- Apabila semua sudah dilakukan sesuai intruksi, maka tinggal buka http://localhost:3000/
- Selesai, kalian bisa melihat monitoring & graphic hasil sensor!

# Tech stacks
- Platform IO
- C++
- Javascript
- Express.js
- React.js
- MySQL
- Sequelize
- Cors
- Bootstrap
- Axios
- Recharts
- React-dom

# Tools
- Node MCU
- Kabel jumper
- Sensor Ultrasonik