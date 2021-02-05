const db = require('../db/database'); 
const Element = require("../db/database");
const element = {};

element.createElement = async (req, res) => {
  try{
    console.log('Creating dynamic element')
    const { type, value } = req.body;
    let { attributes, attval } = req.body;
    if(!type || !value){
      return res.status(400).send('Element type and value are mandatory')
    }
    attributes = attributes ? attributes.includes(',') ? attributes.split(',') : [attributes] : [];
    attval = attval ? attval.includes(',') ? attval.split(',') : [attval] : [];
    if(attval.length !== attributes.length){
      return res.status(400).send('Attribute and value do not match')
    }
    const attribute = {};
    if(attributes.length){
      for(let i=0;i<attributes.length;i++){
        const att = attributes[i];
        attribute[attributes[i]] = attval[i];
      }
      const result = await db.insertElement([type, value, { attribute }])
      return res.status(200).send((result.rows[0].id).toString());
    }
    const result = await db.insertElement([type, value, {}])
    return res.status(200).send((result.rows[0].id).toString());
  } catch(err){
    console.log(err);
  }
};

element.editElement = async (req, res) => {
  try{
    console.log('Updating dynamic element')
    const { id } = req.params;
    if(!id){
      return res.status(400).send('Missing element id')
    }
    const { type, value } = req.body;
    let { attributes, attval } = req.body;
    attributes = attributes ? attributes.includes(',') ? attributes.split(',') : [attributes] : [];
    attval = attval ? attval.includes(',') ? attval.split(',') : [attval] : [];
    if(attval.length !== attributes.length){
      return res.status(400).send('Attribute and value do not match')
    }
    const attribute = {};
    for(let i=0;i<attributes.length;i++){
      const att = attributes[i];
      attribute[attributes[i]] = attval[i];
    }

    if(attributes.length){
      for(let i=0;i<attributes.length;i++){
        const att = attributes[i];
        attribute[attributes[i]] = attval[i];
      }
      await db.updateElement([value, { attribute },id]); 
      return res.status(200).send('Attributes updated')
    }
    await db.updateElement([value, {},id]); 
    return res.status(200).send('Attributes updated')
  } catch(err){
    console.log(err);
  }
};

element.getElement = async(req,res)=>{
  try{
    console.log('Getting dynamic element')
    const { id } = req.params;
    if(!id){
      return res.status(400).send('Missing element id')
    }
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
  } catch(err){
    console.log(err);
  }
}

module.exports.element = element;
