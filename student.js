import { Sequelize } from "sequelize"
const { DataTypes } = Sequelize

const sequelize = new Sequelize({
    dialect: "sqlite", 
    storage: "./database.sqlite",
    define : {
        timestamps: false,
    },
})

const Student = sequelize.define(
    "students",
    {
        student_id: {
            type: DataTypes.INTIGER,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 20]
            }
        },

        favorite_class: {
            type: DataTypes.STRING,
            defaultValue:  'Computer Science'
        },

        school_year: {
            type: DataTypes.INTIGER,
            allowNull: false,
        },

        has_language_examination: {
            type: DataTypes.BOOLEAN,
            defaultValue:  true,
        },
    },
    {
        freezeTableName: true,
    }
);

console.log(sequelize.models.students);

Student.sync()
    .then((data) => {
        console.log("Table and model synced successful");
	})
	.catch((err) => {
		console.log("Error syncing the table and model");
	});


Student.sync({ alert: true })
    .then(() => {
        return Student.bulkCreate([
            {name: "Ajax", favorite_class: "Biology", school_year: '11', has_language_examination: true},
            {name: "Robertho", favorite_class: "History", school_year: '11', has_language_examination: false},
            {name: "Bertholuto", favorite_class: "Computer Science", school_year: '11', has_language_examination: false},
            {name: "Rainar", favorite_class: "PE", school_year: '11', has_language_examination: false},
            {name: "Armin Alert", favorite_class: "Computer Science", school_year: '11', has_language_examination: true},
        ]);
	})
	.then((data) => {
		data.forEach((element) => {
      console.log(element.toJSON())
    })
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});