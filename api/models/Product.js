/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id:{
        type:'integer',
        primaryKey:true,
        autoIncrement:true
      },
      title:{type:'string'},
      name:{type:'string'},
      price:{type:'integer'},
      unitPrice:{type:'string'},
      source:{type:'string'},
      discount:{type:'string'},
      description:{type:'string'},
      content:{type:'string'},
      Images:{ 
        collection:'Image',//call model
          via:'idProduct'//tham chieu ID
      },
      idType:{
        model:'TypeProduct'
      }
  }
};

