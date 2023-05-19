const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'orbital_local',
  'root',
  'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const User = sequelize.define('users', {
  id: {  // id INT AUTO_INCREMENT PRIMARY KEY
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {  // email VARCHAR(255)
    type: DataTypes.STRING,
    unique: true
  },
  username: {  // username TEXT
    type: DataTypes.TEXT
  },
  password_hash: {  // password_hash TEXT
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
})

const Notebook = sequelize.define('notebooks', {
  id: {  // id INT AUTO_INCREMENT PRIMARY KEY
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {  // name TEXT
    type: DataTypes.TEXT
  },
  description: {  // description TEXT
    type: DataTypes.TEXT
  },
  created_at: {  // created_at DATETIME
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  created_by: {  // created_by INT
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: false
})

// FOREIGN KEY (created_by) REFERENCES users(id)
Notebook.User = Notebook.belongsTo(User, {
  foreignKey: "created_by"
})
User.Notebooks = User.hasMany(Notebook, {
  foreignKey: "created_by"
})

const Note = sequelize.define('note', {
  id: {  // id INT AUTO_INCREMENT PRIMARY KEY
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {  // title TEXT
    type: DataTypes.TEXT
  },
  content: {  // content TEXT
    type: DataTypes.TEXT
  },
  created_at: {  // created_at DATETIME
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  notebook_id: {  // notebook_id INT
    type: DataTypes.INTEGER,
    references: {
      model: Notebook,
      key: 'id'
    }
  }
}, {
  timestamps: false
})

// FOREIGN KEY (notebook_id) REFERENCES notebooks(id)
Note.Notebook = Note.belongsTo(Notebook, {
  foreignKey: "notebook_id"
})
Notebook.Notes = Notebook.hasMany(Note, {
  foreignKey: "notebook_id"
});

(async () => {
  // Simple read
  const users = await User.findAll({
    attributes: ["email", "username"]
  })
  // console.log(users.map(user => user.dataValues))

  // WHERE clause
  const notebook = await Notebook.findAll({
    where: {
      id: 1
    }
  })
  // console.log(notebook[0].dataValues)

  // With other tables
  const fullNotebook = await Notebook.findAll({
    where: {
      id: 1
    },
    include: [User, Note]
  })
  // console.log(fullNotebook[0].toJSON())

  // Aggregate functions
  const usersCount = await User.findAll({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'count']
    ]
  })
  // console.log(usersCount[0].toJSON())

  // Misc
  const limitedNotes = await Note.findAll({
    limit: 6,
    offset: 1
  })
  console.log(limitedNotes.map(lm => lm.toJSON()))
})()