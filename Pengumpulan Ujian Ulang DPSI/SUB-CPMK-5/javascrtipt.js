// models/index.js
const { Sequelize, DataTypes } = require("sequelize");

// Koneksi ke database MySQL (ganti sesuai konfigurasi)
const sequelize = new Sequelize("nama_database", "user_db", "password_db", {
  host: "localhost",
  dialect: "mysql",
});

// Model Author
const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(50),
  },
});

// Model Category
const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

// Model Book
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING(20),
    unique: true,
  },
});

// RELASI
Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, { foreignKey: "categoryId" });

Book.belongsToMany(Author, { through: "BookAuthor" });
Author.belongsToMany(Book, { through: "BookAuthor" });

// Sinkronisasi ke database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Koneksi database berhasil.");
    await sequelize.sync({ force: true }); // force: true akan drop tabel lama
    console.log("✅ Model berhasil disinkronkan ke database.");
  } catch (error) {
    console.error("❌ Gagal konek database:", error);
  }
})();

module.exports = { sequelize, Author, Book, Category };
