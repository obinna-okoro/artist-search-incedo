import dotenv from "dotenv";
import axios from "axios";
import ObjectsToCsv from "objects-to-csv";
import dataObj from "../data.js"



dotenv.config();



/**
 * getArtist function is a controller for calling an Api and getting an array of artist objects
 * @param  {object} req is the request object
 * @param  {object} res is the response object
 *  @return {Array} returns a json object in an Array
*/

export const getArtists = async (req, res) => {

    //name and fileName from req parameters.
    
    const { name, file } = req.params
    

    try {
    
        //API call
        const result = await axios(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${process.env.API_KEY}&format=json`)
        
        //Extracting the needed data from data fetched
        const data = result.data.results.artistmatches.artist

        //Checking if there is a result from the Api for the searched artist
        if(data.length !== 0) {

            //Checking if Artist is more than one and returning one randomly
            if (data.length > 1){

                const randomNum = Math.floor(Math.random() * (data.length + 1)); 
    
                
                const dataResult = [data[randomNum], {}]
    
                
                
            // Writing csv file using Object-to-csv module
              const csv = new ObjectsToCsv(dataResult)
    
              await csv.toDisk(`./${file}.csv`, { append: true })
    
               
    
                return res.status(200).json(dataResult)
            
            } else {
                 //Checking if Artist returned is one and returning it
                const dataResult = [data[0], {}]
    
                // Writing csv file using Object-to-csv module
                const csv = new ObjectsToCsv(dataResult)
    
                await csv.toDisk(`./${file}.csv`, { append: true })
    
                return res.status(200).json(dataResult)
    
            }
        } else {
             // if there is no result for the searched artist in the API tae a random artist from predefined dictionary data.js
            const randomNum = Math.floor(Math.random() * (dataObj.length + 1));

            
            const dataResult = [dataObj[randomNum], {}]

            const csv = new ObjectsToCsv(dataResult)
    
              await csv.toDisk(`./${file}.csv`, { append: true })
    
               
    
                return res.status(200).json(dataResult)

        }

       
       
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
  
}