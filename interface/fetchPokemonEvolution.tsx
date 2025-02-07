// Description: This file contains the code that fetches the evolution of a pokemon from the API.

import axios from "axios";

// Define the Evolution interface
interface Evolution {
  id: number;
  name: string;
  image: string;
}

// Fetch the evolution of a pokemon by id
const useGetOnePokemonEvolutions = async (
  evolutionId: number
): Promise<Evolution> => {
  try {
    const evolutionResponse = await axios.get(
      `https://pokebuildapi.fr/api/v1/pokemon/${evolutionId}`
    );
    return evolutionResponse.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default useGetOnePokemonEvolutions;