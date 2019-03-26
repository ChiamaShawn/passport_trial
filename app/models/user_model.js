
module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user', {
        uuid: {
            type: Sequelize.STRING,
            defaultValue: null
         },
         username: {
             type: Sequelize.STRING,
             allowNull: false
          },
       
          phone: {
              type: Sequelize.STRING
          },
          user_type: {
              type: Sequelize.INTEGER
          }, 
          about: {
             type: Sequelize.TEXT
         },
     
         email: {
             type: Sequelize.STRING,
             validate: {
                 isEmail: true
             }
         },
     
         password: {
             type: Sequelize.STRING,
             allowNull: false
         },
     
         last_login: {
             type: Sequelize.DATE
         },
     
         status: {
             type: Sequelize.ENUM('active', 'inactive'),
             defaultValue: 'active'
         }
    });
    return User;
}