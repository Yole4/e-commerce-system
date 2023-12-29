const db = require('../database/Connection');

// get category
const getCategory = async (req, res) => {
    const getCategoryProcedure = 'CALL GetCategory()';
    db.query(getCategoryProcedure, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            res.status(200).json({message: results[0]});
        }
    });
}

const getProduct = async (req, res) => {
    const getProductsProcedure = 'CALL GetProducts()';

    db.query(getProductsProcedure, (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results[0] }); 
        }
    });
};

module.exports = {getCategory, getProduct};