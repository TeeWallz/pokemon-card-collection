import axios from "axios";

import pokemon from 'pokemontcgsdk'

pokemon.configure({apiKey: '4440c304-d5c0-4939-b533-5befa084795c'})

// exports.tcgapi = pokemon;
export default pokemon


// export const tcgapiGetCardsFromQuery = (query) => {
//     return pokemon.card.all({q: query})
// };


export const generateTcgApiQuery =  (key, values) => {
      var url_string = "(";

      for(var i = 0; i < values.length; i++){
        url_string += key + ":" + values[i];
        if(i == values.length -1){
            url_string += ")"
        }
        else{
            url_string += " OR "
        }

      }
      return url_string
}