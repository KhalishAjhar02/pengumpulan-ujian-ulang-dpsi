-- 1. Tabel Penulis
CREATE TABLE penulis (
    id_penulis INT PRIMARY KEY AUTO_INCREMENT,
    nama_penulis VARCHAR(100) NOT NULL,
    negara VARCHAR(50)
);

-- 2. Tabel Penerbit
CREATE TABLE penerbit (
    id_penerbit INT PRIMARY KEY AUTO_INCREMENT,
    nama_penerbit VARCHAR(100) NOT NULL,
    alamat VARCHAR(255),
    telepon VARCHAR(20)
);

-- 3. Tabel Kategori
CREATE TABLE kategori (
    id_kategori INT PRIMARY KEY AUTO_INCREMENT,
    nama_kategori VARCHAR(50) NOT NULL
);

-- 4. Tabel Buku
CREATE TABLE buku (
    id_buku INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(200) NOT NULL,
    tahun_terbit YEAR NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    id_penerbit INT,
    id_kategori INT,
    stok INT DEFAULT 0,
    FOREIGN KEY (id_penerbit) REFERENCES penerbit(id_penerbit),
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori)
);

-- 5. Tabel Relasi Buku-Penulis (Many-to-Many)
CREATE TABLE buku_penulis (
    id_buku INT,
    id_penulis INT,
    PRIMARY KEY (id_buku, id_penulis),
    FOREIGN KEY (id_buku) REFERENCES buku(id_buku),
    FOREIGN KEY (id_penulis) REFERENCES penulis(id_penulis)
);

-- 6. Tabel Anggota
CREATE TABLE anggota (
    id_anggota INT PRIMARY KEY AUTO_INCREMENT,
    nama_anggota VARCHAR(100) NOT NULL,
    alamat VARCHAR(255),
    telepon VARCHAR(20),
    tanggal_daftar DATE
);

-- 7. Tabel Peminjaman
CREATE TABLE peminjaman (
    id_peminjaman INT PRIMARY KEY AUTO_INCREMENT,
    id_anggota INT,
    tanggal_pinjam DATE NOT NULL,
    tanggal_kembali DATE,
    status ENUM('Dipinjam', 'Dikembalikan') DEFAULT 'Dipinjam',
    FOREIGN KEY (id_anggota) REFERENCES anggota(id_anggota)
);

-- 8. Tabel Detail Peminjaman (Many-to-Many Peminjaman-Buku)
CREATE TABLE detail_peminjaman (
    id_peminjaman INT,
    id_buku INT,
    jumlah INT DEFAULT 1,
    PRIMARY KEY (id_peminjaman, id_buku),
    FOREIGN KEY (id_peminjaman) REFERENCES peminjaman(id_peminjaman),
    FOREIGN KEY (id_buku) REFERENCES buku(id_buku)
);