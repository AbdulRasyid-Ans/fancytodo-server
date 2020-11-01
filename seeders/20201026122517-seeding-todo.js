'use strict';
const data = [{
  title : "Rapat Kelas",
  description : "Membahas tentang keuangan kelas",
  status : false,
  due_date : "2020-10-30",
  createdAt : new Date(),
  updatedAt : new Date()
  },
  {
  title : "General Cleaning",
  description : "Seluruh murid membersihkan kelas",
  status : false,
  due_date : "2020-10-29",
  createdAt : new Date(),
  updatedAt : new Date()
 }]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
