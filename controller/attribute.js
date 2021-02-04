const db = require('../db/database'); 
const Element = require("../db/database");
const attribute = {};

attribute.createAttribute = async (req, res) => {
  const { type, value } = req.body;
  let { attributes, attval } = req.body;
  attributes = attributes.includes(',') ? attributes.split(',') : [attributes];
  attval = attval.includes(',') ? attval.split(',') : [attval];
  if(attval.length !== attributes.length){
    return res.status(400).send('Attribute and value doesnot match')
  }
  const attribute = {};
  for(let i=0;i<attributes.length;i++){
    const att = attributes[i];
    attribute[attributes[i]] = attval[i];
  }
  const result = await db.insertElement([type, value, { attribute }])
  return res.status(200).send((result.rows[0].id).toString());
};

attribute.editAttribute = async (req, res) => {
  const { id } = req.params;
  const { type, value } = req.body;
  let { attributes, attval } = req.body;
  attributes = attributes.includes(',') ? attributes.split(',') : [attributes];
  attval = attval.includes(',') ? attval.split(',') : [attval];
  if(attval.length !== attributes.length){
    return res.status(400).send('Attribute and value doesnot match')
  }
  const attribute = {};
  for(let i=0;i<attributes.length;i++){
    const att = attributes[i];
    attribute[attributes[i]] = attval[i];
  }
  await db.updateElement([value, { attribute },id]);
  return res.status(200).send('Success')
 
  return res.status(200).send('Attributes updated')
};

attribute.getAttribute = async(req,res)=>{
  const { id } = req.params;
  const result = await db.getElement([id])
  if(!result.rowCount){
    return res.status(400).send('No data found')
  }
  const { type , value } = result.rows[0];
  let { attribute } = result.rows[0].attribute
  const attributeKeys = [];
  const attributeValues = [];
  for(const key in attribute){
    attributeKeys.push(key);
    attributeValues.push(attribute[key])
  }
  return res.status(200).send({
    type,
    value,
    attributeKeys,
    attributeValues
  });
}

module.exports.attribute = attribute;
